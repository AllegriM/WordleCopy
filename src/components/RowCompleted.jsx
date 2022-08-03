import { Stack } from "@chakra-ui/react"
import RowBox from "./RowBox"

function RowCompleted({ words, solution }) {

    const CheckLetter = (word, pos) => {
        if (solution.includes(word)) {
            if (solution[pos] === word) {
                return "correct"
            } else {
                return "present"
            }
        } else {
            return "absent"
        }
    }
    
    const arr = Array.from(Array(5));
    return (
        <Stack direction='row' justify='center' mt='10px'>
            {arr.map((_, index) => {
                return (
                    <RowBox key={index} word={words[index]} index={index} status={CheckLetter(words[index], index)} />
                )
            })}
        </Stack>
    )
}

export default RowCompleted