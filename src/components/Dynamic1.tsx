import React from 'react'
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from '../stackflow';

const Dynamic1 = () => {
    const {push} = useFlow()
    const onClick = () => {
        push('Example2', {})
    }
  return (
    <div>
        <div>example1</div>
        <button onClick={onClick}>go example2</button>
    </div>
  )
}

export default Dynamic1