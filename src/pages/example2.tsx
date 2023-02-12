import { AppScreen } from '@stackflow/plugin-basic-ui'
import React from 'react'
import { useFlow } from '../stackflow'

const Dynamic2 = React.lazy(() => import ('../components/Dynamic2'));

const example2 = () => {
    const {push} = useFlow()
    const onClick = () => {
        push('Example1', {})
    }

  return (
    <AppScreen>
      <Dynamic2 />
    </AppScreen>
  )
}

export default example2