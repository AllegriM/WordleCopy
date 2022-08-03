import './App.css'
import Wordle from './components/Wordle'
import { Box } from '@chakra-ui/react';

export const WORD_LENGTH = 5
export const MAX_ROWS = 6;


function App() {



  return (
    <Box className='App'>
      <Wordle />
    </Box>
  )
}

export default App
