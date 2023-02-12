import React from 'react'
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from '../stackflow';

const Dynamic2 = () => {
    const {push} = useFlow()
    const onClick = () => {
        push('Example1', {})
    }
  return (
    <div>
        <div>example2 after after~~~!!!!</div>
        <button onClick={onClick}>go example1</button>
    </div>
  )
}

export default Dynamic2