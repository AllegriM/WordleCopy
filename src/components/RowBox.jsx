import { Stack, Text } from "@chakra-ui/react"

function RowBox( {word, index, status} ) {

    return (
        <Stack 
            bg = {!word ? "transparent" :  status === "correct" ? "#6aaa64" : status === "present" ? "#c9b458" : status === "absent" ? "#787c7e" : null}
            key={index} 
            border='1px solid grey' 
            borderRadius='4px' 
            h='65px' 
            w='65px' 
            justify='center' 
            align='center'
            >
            <Text fontSize='2.65rem'>{word}</Text>
        </Stack>
    )
}

export default RowBox