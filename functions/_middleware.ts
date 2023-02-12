import {PagesFunction, R2Bucket} from '@cloudflare/workers-types';

interface Env {
  CF_DIRECT_UPLOAD_TEST: R2Bucket;
}


export const onRequestGet: PagesFunction<Env | any> = async (context) => {  
  try {
    const res = await context.env.ASSETS.fetch(context.request.url);

    console.log('res', res);
    if (res.ok) {
      return res;
    }
  } catch (error) {
    const obj = await context.env.CF_DIRECT_UPLOAD_TEST.get(context.request.url);

    if (!obj) {
      return new Response('Not found', { status: 404 });  
    }

    console.log('obj', obj);
    return new Response(obj.body as any);
  }

  return context.next();
}