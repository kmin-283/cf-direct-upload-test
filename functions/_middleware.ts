import {EventContext, PagesFunction, R2Bucket} from '@cloudflare/workers-types';

interface Env {
  CF_DIRECT_UPLOAD_TEST: R2Bucket;
}


export const onRequestGet = async (context) => {
  try {
    const res = await context.env.ASSETS.fetch(context.request.url);

    // if (context.request.url.slice(-3) === '.js') {
    //   throw new Error('find assets in r2 storage');
    // }

    // console.log('res1', res);
    // console.log('res2', res.status);
    // console.log('res3', res.ok);

    // const v = res.headers.get('content-type');
    // console.log('res4', v);
    // file extension과 content-type이 일치하지 않는 경우가 있음 -> 그럴 때 에러 발생시키기

    const url = new URL(context.request.url);

    if (url.pathname !== '/' && res.headers.get('content-type').includes("text/html")) {
      console.log(context.request.url);
      if (context.request.url.slice(-4) !== 'html') {
        throw new Error('find assets in r2 storage');
      }
    }

    return res
  } catch (error) {
    const url = new URL(context.request.url);
    const obj = await context.env.CF_DIRECT_UPLOAD_TEST.get(`cf-direct-upload-test${url.pathname}`);

    console.log('obj', obj);
  
    if (obj === null) {
      return new Response('Not found', { status: 404 });  
    }

    return new Response(obj.body as any, {
      headers: {
        'Content-Type': 'application/javascript',
    }});
  }
}