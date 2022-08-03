import './App.css'
import Wordle from './components/Wordle'
import { useEffect, useState } from 'react';
import { getDailyWord } from './services/fetchDailyWord';
import { Stack } from '@chakra-ui/react';

export const WORD_LENGTH = 5
export const MAX_ROWS = 6;


function App() {

  const [todayWord, setTodayWord] = useState("")

  useEffect(() => {
    const misteryWord = getDailyWord()
    return setTodayWord(misteryWord.toUpperCase())
  }, [])

  return (
    <Stack className='App'>
      <Wordle secretWord={todayWord} />
    </Stack>
  )
}

export default App
