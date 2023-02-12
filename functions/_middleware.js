// pages에 모두 올림. + r2에도 모두 올림
// assets을 못찾았으면 r2에서 찾아서 서빙하기

export async function onRequest(context) {
    const reqPath = context.event.request.url
    console.log(context);

    // const tryFirst = await context.env.ASSETS.fetch()
    // // fetch에 실패하면 r2에서 정적파일을 가져다가 서빙

    // const obj = await context.env.CF_DIRECT_UPLOAD_TEST.get('cf-direct-upload-test/assets/[any].js');

    // console.log(obj);

    // if (obj === null) {
    //   return new Response('Not found', { status: 404 });  
    // }
    // return new Response(obj.body);
    return context
}