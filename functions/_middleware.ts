import {PagesFunction, R2Bucket} from '@cloudflare/workers-types';

interface Env {
  CF_DIRECT_UPLOAD_TEST: R2Bucket;
}


export const onRequestGet: PagesFunction<Env | any> = async (context) => {  
  const url = new URL(context.request.url);
  console.log('url', url.pathname);
  const obj = await context.env.CF_DIRECT_UPLOAD_TEST.get(`cf-direct-upload-test/${url.pathname}`);
  console.log('obj', obj);

  try {
    const res = await context.env.ASSETS.fetch(context.request.url);

    console.log('res', res);
    if (res.ok) {
      return res;
    } else {
      throw new Error('find assets in r2 storage');
    }
  } catch (error) {
    const url = new URL(context.request.url);
    const obj = await context.env.CF_DIRECT_UPLOAD_TEST.get(url.pathname);
    console.log('obj', obj);
    if (!obj) {
      return new Response('Not found', { status: 404 });  
    }
    return new Response(obj.body as any);
  }

  return context.next();
}