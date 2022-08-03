import { Heading, Grid, Stack, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { isValid } from '../services/fetchDailyWord'
import Keyboard, { keys } from '../components/Keyboard'
import RowCompleted from '../components/RowCompleted'
import RowCurrent from '../components/RowCurrent'
import RowEmpty from '../components/RowEmpty'
import { FaDiceSix } from 'react-icons/fa';
import { getDailyWord } from '../services/fetchDailyWord';

export const WORD_LENGTH = 5
export const MAX_ROWS = 6;


function Wordle() {

    const [secretWord, setSecretWord] = useState("")
    
    useEffect(() => {
        const misteryWord = getDailyWord()
        return setSecretWord(misteryWord.toUpperCase())
    }, [])

    const [completedWords, setCompletedWords] = useState([])
    const [currentGuessRow, setCurrentGuessRow] = useState(1)
    const [currentWord, setCurrentWord] = useState("")
    const [gameStatus, setGameStatus] = useState("Playing")
    
    const handleKeyDown = (e) => {
        const letter = e.key
        if (letter === 'Backspace' && currentWord.length > 0) {
            return onBackspace()
        }
        if (letter === 'Enter' && currentWord.length === 5 && currentGuessRow <= MAX_ROWS) {
            if (gameStatus === "Win" || gameStatus === "Lose") {
                return
            }
            return onEnter()
        }
        if (keys.includes(letter)) {
            const newWord = currentWord + letter
            if (newWord.length <= 5) setCurrentWord(newWord.toUpperCase())
            else return
        }
    }
    
    const onEnter = async () => {
        if (secretWord === currentWord) {
            setCompletedWords([...completedWords, currentWord])
            setGameStatus("Win")
            return
        }
        if (currentGuessRow === MAX_ROWS) {
            setCompletedWords([...completedWords, currentWord])
            setGameStatus("Lose")
            return
        }

        const validWord = await isValid(currentWord)
        if (currentWord.length === 5 && !validWord) {
            alert("Invalid Word")
            return
        }
        
        setCompletedWords([...completedWords, currentWord]);
        setCurrentGuessRow(currentGuessRow + 1)
        setCurrentWord("");
    }
    
    const onBackspace = () => {
        return setCurrentWord(currentWord.slice(0, -1))
    }
    
    const playAgain = () => {
        setCompletedWords([])
        setCurrentGuessRow(1)
        setGameStatus("Playing")
        setCurrentWord("")
        const misteryWord = getDailyWord()
        return setSecretWord(misteryWord.toUpperCase())
    }
    console.log(secretWord)
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])
    
    return (
        <Stack className="Wordle" py={3} pb={10} minH='100vh' justify='center' direction='row' flexShrink={0}>
            <Stack minH='100%' justify='space-between' align='center'>
                <Heading as='h2'>Wordle</Heading>
                <Grid >
                    {
                        completedWords.map((word, index) => {
                            return (
                                <RowCompleted words={word} key={index} solution={secretWord} />
                                )
                            })
                        }
                    {
                        gameStatus === "Playing" ? (
                            <RowCurrent words={currentWord} />
                            ) : null
                        }
                    {
                        Array.from(Array(MAX_ROWS - currentGuessRow)).map((_, index) => (
                            <RowEmpty key={index} />
                        ))}
                </Grid>
                <Stack h='40px' w='auto'>
                    {
                        gameStatus === "Win" || gameStatus === "Lose" ?
                            <Button onClick={playAgain} display='flex' gap='5px'><FaDiceSix className='icon-svg' fontSize='1rem' px='10px' /> Play Again</Button>
                            : null
                    }
                </Stack>
                <Keyboard />
            </Stack>
        </Stack>
    )
}

export default Wordle
