import { R2Bucket, Cache, PagesFunction } from '@cloudflare/workers-types'
import { lookup } from 'mrmime'

interface Env {
  CF_DIRECT_UPLOAD_TEST: R2Bucket
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url)

  const cache: Cache = (caches as any)?.default

  const responseHeaders = new Headers()

  if (url.pathname.includes('assets')) {
    if (cache) {
      const response = await cache.match(context.request)
      if (response) {
        return response
      }
    }

    const contentType = lookup(url.pathname.slice(1))

    responseHeaders.set('Content-Type', contentType || 'application/octet-stream')

    switch (contentType) {
      case 'text/html':
      case 'application/json': {
        responseHeaders.set('Cache-Control', 'public, max-age=0, must-revalidate')
        break
      }
      default: {
        responseHeaders.set('Cache-Control', 'public, max-age=86400')
        break
      }
    }
  } else if (url.pathname === '/' || url.pathname === '/index.html') {
    responseHeaders.set('Content-Type', 'text/html')
  }

  try {
    const res = await context.env.ASSETS.fetch(context.request.url)

    // cloudflare에서 asset을 가져올 때 해당 에셋을 찾지 못하면 자동으로 기본 index.html을 가져오는 문제가 있음.
    // 그래서 청크에러가 발생해야하는 상황에서도 200으로 응답이 떨어지는 문제가 있음.

    if (url.pathname.includes('assets') && res.headers.get('content-type')?.includes('text/html')) {
      if (responseHeaders.get('content-type') !== 'text/html') {
        throw new Error('find assets in r2 storage')
      }
    }

    const newRes = new Response(res.body, {
      ...res,
      headers: responseHeaders,
    })

    // html이 아니면 캐싱
    if (responseHeaders.get('content-type') !== 'text/html') {
      context.waitUntil(cache.put(context.request, newRes.clone()))
    }
    return newRes
  } catch (error) {
    const obj = await context.env.CF_DIRECT_UPLOAD_TEST.get(`cf-direct-upload-test${url.pathname}`)

    console.log('get resource from r2')
    if (obj === null) {
      return new Response('Not found', { status: 404 })
    }

    const newRes = new Response(obj.body, {
      status: 200,
      headers: responseHeaders,
    })

    context.waitUntil(cache.put(context.request, newRes.clone()))
    return newRes
  }
}
