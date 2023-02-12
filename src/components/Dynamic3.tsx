import React from 'react'
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from '../stackflow';

const Dynamic3 = () => {
    const {push} = useFlow()
    const onClick = () => {
        push('Example1', {})
    }
  return (
    <div>
        <div>example3</div>
        <button onClick={onClick}>go example1</button>
    </div>
  )
}

export default Dynamic3