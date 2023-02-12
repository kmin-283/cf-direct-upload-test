import React from 'react'
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from '../stackflow';

const Dynamic3 = React.lazy(() => import ('../components/Dynamic3'));


const example3 = () => {
    const {push} = useFlow()
    const onClick = () => {
        push('Example1', {})
    }
  return (
    <AppScreen>
<Dynamic3/>
    </AppScreen>
  )
}

export default example3