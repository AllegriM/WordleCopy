import { VStack, Heading } from '@chakra-ui/react'
import Keyboard from './components/Keyboard'
import GuessRows from './components/GuessRows'
import './App.css'

function App () {
  return (
    <VStack className="App" py={3} pb={10} justify='space-between' align=''>
      <Heading as='h2'>Truchordle</Heading>
      <GuessRows />
      <Keyboard />
    </VStack>
  )
}

export default App
