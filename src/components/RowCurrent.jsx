import { Stack } from "@chakra-ui/react"
import RowBox from "./RowBox"

function RowCurrent({ words }) {

    const wordArray = words.split("")
    
    return (
        <Stack direction='row' justify='center' mt='10px'>
            {wordArray.map((letter, index) => {
                return (
                    
                    <RowBox key={index} word={letter} index={index} />
                )
            })}
            {Array.from(Array(5 - wordArray.length)).map((_, index) => (
                <RowBox key={index} word={""} />
            ))}
        </Stack>
    )
}

export default RowCurrent