export async function onRequest(context) {  
    const reqPath = context.functionPath;
    const obj = await context.env.BUCKET.get(reqPath);
    if (obj === null) {
      return new Response('Not found', { status: 404 });  
    }  
    return new Response(obj.body);
  }