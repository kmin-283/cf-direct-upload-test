import {EventContext, PagesFunction, R2Bucket} from '@cloudflare/workers-types';

interface Env {
  CF_DIRECT_UPLOAD_TEST: R2Bucket;
}


export const onRequestGet = async (context) => {
  const url = new URL(context.request.url);


  // cloudflare pages 도메인에 대한 asset get 요청만 처리해야 함.
  console.log('url', url);
  console.log('url', url.host);
  if (url.host !== 'cf-direct-upload-test.pages.dev') {
    return context.next();
  }

  try {
    const res = await context.env.ASSETS.fetch(context.request.url);

    // cloudflare에서 asset을 가져올 때 해당 에셋을 찾지 못하면 자동으로 기본 index.html을 가져오는 문제가 있음.  
    // 그래서 청크에러가 발생해야하는 상황에서도 200으로 응답이 떨어지는 문제가 있음.

    if (url.pathname.includes('assets') && res.headers.get('content-type').includes("text/html")) {
      if (context.request.url.slice(-4) !== 'html') {
        throw new Error('find assets in r2 storage');
      }
    }

    return res
  } catch (error) {
    const obj = await context.env.CF_DIRECT_UPLOAD_TEST.get(`cf-direct-upload-test${url.pathname}`);
  
    if (obj === null) {
      return new Response('Not found', { status: 404 });  
    }

    // file extension에 따라 content-type을 다르게 설정해줘야함. 종류는 js와 이미지 에셋이 있음.
    return new Response(obj.body as any, {
      headers: {
        'Content-Type': 'application/javascript',
    }});
  }
}