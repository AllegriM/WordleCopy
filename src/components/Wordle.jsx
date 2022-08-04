import { Heading, Grid, Stack, Button, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { isValid } from '../services/fetchDailyWord'
import Keyboard, { keys } from '../components/Keyboard'
import RowCompleted from '../components/RowCompleted'
import RowCurrent from '../components/RowCurrent'
import RowEmpty from '../components/RowEmpty'
import { FaDiceSix } from 'react-icons/fa';
import { getDailyWord } from '../services/fetchDailyWord';
import { AnimatePresence, motion } from 'framer-motion'

export const WORD_LENGTH = 5
export const MAX_ROWS = 6;

const MotionModal = motion(Stack);


function Wordle() {

    const [secretWord, setSecretWord] = useState("")

    useEffect(() => {
        const misteryWord = getDailyWord()
        return setSecretWord(misteryWord.toUpperCase())
    }, [])

    const [invalidWord, setInvalidWord] = useState(false)
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
            setInvalidWord(true)
            setTimeout(() => {
                setInvalidWord(false)
            }, 1500)
            return
        }

        setCompletedWords([...completedWords, currentWord]);
        setCurrentGuessRow(currentGuessRow + 1)
        setCurrentWord("");
        setInvalidWord(false)
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

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    return (
        <Stack className="Wordle" position='relative' py={3} pb={10} minH='100vh' justify='center' direction='row' flexShrink={0} zIndex='1'>
            <AnimatePresence>
            {
                gameStatus === "Lose" ?
                    <MotionModal
                        initial={{ x: 0, opacity: 0  }}
                        animate={{ x: -100, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        duration={2}
                        position='absolute'
                        bg='#090909'
                        right='0'
                        zIndex='10'
                        color='white'
                        borderRadius='6px'
                        p={4}
                    >
                        <Text fontSize='1rem'>word was: {secretWord}</Text>
                    </MotionModal>
                    : null
            }
                {
                    invalidWord ?
                        <MotionModal
                            initial={{ y: -40, opacity: 0 }}
                            animate={{ y: 20, opacity: 1 }}
                            exit={{ y: -40, opacity: 0 }}
                            duration={1}
                            position='absolute'
                            bg='#020202'
                            zIndex='10'
                            color='white'
                            borderRadius='6px'
                            p={3}>
                            <Text fontSize='1rem'>Invalid word!</Text>
                        </MotionModal>
                        :
                        null
                }
            </AnimatePresence>
            <Stack minH='100%' justify='space-between' align='center' style={{ margin: "0" }}>
                <Heading as='h2'>Wordle</Heading>
                <Grid >
                    {
                        completedWords.map((word, index) => {
                            return (
                                <RowCompleted words={word} key={index} solution={secretWord} error={invalidWord} />
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
                        ))
                    }
                </Grid>
                <Stack h='40px' w='auto'>
                    {
                        gameStatus === "Win" || gameStatus === "Lose" ?
                            <Button onClick={playAgain} variant='unstyled' p='0 1rem' bg='blackAlpha.500' display='flex' gap='5px'><FaDiceSix className='icon-svg' fontSize='1rem' /> Play Again</Button>
                            : null
                    }
                </Stack>
                <Keyboard />
            </Stack>
        </Stack>
    )
}

export default Wordle
