import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Stack } from './stackflow'

function App() {
  const [count, setCount] = useState(0)

  return <Suspense>
      <Stack /> 
    </Suspense>
}

export default App
