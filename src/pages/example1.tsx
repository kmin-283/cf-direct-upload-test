import React from 'react'
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from '../stackflow';


const example1 = () => {
    const {push} = useFlow()
    const onClick = () => {
        push('Example2', {})
    }
  return (
    <AppScreen>
        <div>example1</div>
        <button onClick={onClick}>go example2</button>
    </AppScreen>
  )
}

export default example1