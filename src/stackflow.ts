import Example1 from "./pages/example1"
import Example2 from "./pages/example2"
import Example3 from "./pages/example3"
import {stackflow} from "@stackflow/react"
import { basicUIPlugin } from "@stackflow/plugin-basic-ui"
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic'
import { historySyncPlugin } from "@stackflow/plugin-history-sync"


export const { Stack, useFlow, useStepFlow } = stackflow({
    transitionDuration: 350,
    activities: {
        Example1,
        Example2,
        Example3,
    },
    plugins: [basicRendererPlugin(), basicUIPlugin({theme: 'cupertino'}),
    historySyncPlugin({
        routes: {Example1: 'Example1', Example2: 'Example2', Example3: 'Example3'},
        fallbackActivity: () => 'Example1',
      }),
],
    initialActivity: () => "Example1",
})