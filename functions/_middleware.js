export async function onRequestGet(context) {  
    // const obj = await context.env.BUCKET.get('some-key');
    // if (obj === null) {
    //   return new Response('Not found', { status: 404 });  
    // }  
    // return new Response(obj.body);
    const url = new URL(context.request.url);
    let pathname = url.pathname;
    if (url.pathname === '/') {
        pathname = '/index.html';
    }
    console.log(pathname);
    const res = await context.env.ASSETS.fetch(pathname);
    console.log(res);
    
    return context.next();
  }