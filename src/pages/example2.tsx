import { AppScreen } from '@stackflow/plugin-basic-ui'
import React from 'react'
import { useFlow } from '../stackflow'

const example2 = () => {
    const {push} = useFlow()
    const onClick = () => {
        push('Example1', {})
    }

  return (
    <AppScreen>
        <div>example2</div>
        <button onClick={onClick}>go example 1</button>
    </AppScreen>
  )
}

export default example2