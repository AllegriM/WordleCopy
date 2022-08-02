import { Stack, Text } from "@chakra-ui/react"

const WORD_LENGTH = 5

function AttemptRow({ wordAttempt, attemptRowNumber = "" }) {

    const WORDS_REMAINING = WORD_LENGTH - wordAttempt.length

    const words = wordAttempt.split("").concat(Array(WORDS_REMAINING).fill(""))

    return (
        <Stack direction='row' justify='center'>
            {
                words.map( (word, index) => {
                    return (
                        <Stack key={index} border='1px solid grey' borderRadius='4px' h='65px' w='65px' justify='center' align='center'>
                            <Text fontSize='2.65rem'>{word.toUpperCase()}</Text>
                        </Stack>
                    )
                })
            }

        </Stack>
    )
}

export default AttemptRow