import { ChakraProvider } from '@chakra-ui/react'

import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counter/counterSlice'

function App() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()
  return (
    <ChakraProvider>
      <div>
        <div>
          <button
            aria-label="Increment value"
            onClick={() => dispatch(increment())}
            style={{
              backgroundColor: 'gray',
            }}
          >
            Increment
          </button>
          <span>{count}</span>
          <button
            aria-label="Decrement value"
            onClick={() => dispatch(decrement())}
            style={{
              backgroundColor: 'gray',
            }}
          >
            Decrement
          </button>
        </div>
      </div>
    </ChakraProvider>
  )
}

export default App
