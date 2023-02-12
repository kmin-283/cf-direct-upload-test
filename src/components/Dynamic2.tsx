import React from 'react'
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from '../stackflow';

const Dynamic2 = () => {
    const {push} = useFlow()
    const onClick = () => {
        push('Example3', {})
    }
  return (
    <div>
        <div>example2!! after~~!!</div>
        <button onClick={onClick}>go example3</button>
    </div>
  )
}

export default Dynamic2