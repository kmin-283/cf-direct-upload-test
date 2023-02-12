import React, { useEffect, useState } from 'react'
import { AppScreen } from "@stackflow/plugin-basic-ui";
import { useFlow } from '../stackflow';

const Dynamic2 = () => {
    const {push} = useFlow()
    const onClick = () => {
        push('Example3', {})
    }

    const [age, setAge] = useState(0)

    useEffect(() => {
        const a = async () => {
            fetch('https://api.agify.io?name=michael').then(async (res) => {
                const json: {age: number} = await res.json();
                setAge(json.age);
            })
        }
        a();
    },[])

  return (
    <div>
        <div>example2!!</div>
        <p>age is {age}</p>
        <button onClick={onClick}>go example3</button>
    </div>
  )
}

export default Dynamic2