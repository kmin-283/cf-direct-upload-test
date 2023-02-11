export async function onRequest(context) {  
    const reqPath = context.functionPath;
    console.log(context);

    const obj = await context.env.CF_DIRECT_UPLOAD_TEST.get(reqPath);

    console.log(obj);

    if (obj === null) {
      return new Response('Not found', { status: 404 });  
    }
    return new Response(obj.body);
  }