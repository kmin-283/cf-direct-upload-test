import React from 'react'
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from '../stackflow';

const Dynamic1 = React.lazy(() => import ('../components/Dynamic1'));


const example1 = () => {
    const {push} = useFlow()
    const onClick = () => {
        push('Example2', {})
    }
  return (
    <AppScreen>
<Dynamic1/>
    </AppScreen>
  )
}

export default example1