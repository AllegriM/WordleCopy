import { VStack, Heading, Grid } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import  Keyboard, { keys } from '../components/Keyboard'
import RowCompleted from '../components/RowCompleted'
import RowCurrent from '../components/RowCurrent'
import RowEmpty from '../components/RowEmpty'

export const WORD_LENGTH = 5
export const MAX_ROWS = 6;


function Wordle( {secretWord} ) {

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

        console.log(secretWord)
        // const validWord = await isValid(currentWord)
        // console.log(validWord)
        // if (currentWord.length === 5 && !validWord) {
        //   alert("NOT A VALID WORD")
        //   return
        // }

        setCompletedWords([...completedWords, currentWord]);
        setCurrentGuessRow(currentGuessRow + 1)
        setCurrentWord("");
    }

    const onBackspace = () => {
        return setCurrentWord(currentWord.slice(0, -1))
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)

        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    return (
        <VStack className="Wordle" py={3} pb={10} justify='space-between'>
            <Heading as='h2'>Truchordle</Heading>
            {
                gameStatus === "Win" ?
                    console.log("YOU WIN!!")
                    : gameStatus === "Lose" ?
                        console.log("YOU LOSE!!")
                        : null
            }
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
            <Keyboard />
        </VStack>
    )
}

export default Wordle
