export async function onRequest(context) {  
    const reqPath = context.functionPath;
    console.log(context);
    
    const obj = await context.env.BUCKET.get(reqPath);

    console.log(obj);

    if (obj === null) {
      return new Response('Not found', { status: 404 });  
    }
    return new Response(obj.body);
  }