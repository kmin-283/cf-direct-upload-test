export async function onRequestGet(context) {  
    // const obj = await context.env.BUCKET.get('some-key');
    // if (obj === null) {
    //   return new Response('Not found', { status: 404 });  
    // }  
    // return new Response(obj.body);
    console.log(context);
    const res = await context.env.ASSETS.fetch(context.request.url);
    console.log(res);
    
    return context.next();
  }