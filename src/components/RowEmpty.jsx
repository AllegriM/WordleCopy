import { Stack } from "@chakra-ui/react";
import RowBox from "./RowBox"

function RowEmpty() {

    const arr = Array.from(Array(5));

    return (
        <Stack direction='row' justify='center' mt='10px'>
            {
                arr.map((word, index) => {
                    return (
                        <RowBox key={index} word={word} index={index} status="empty" />
                    )
                })
            }
        </Stack>
    )
}

export default RowEmpty