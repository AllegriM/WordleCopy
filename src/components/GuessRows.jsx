import { Grid, Stack } from "@chakra-ui/react"
import AttemptRow from "./AttemptRow"


function GuessRows( {word = ""} ) {
    return (
        <Grid gap='6px' gridTemplateRows='repeat(6, 1fr)' >
            <AttemptRow attemptRowNumber={1} wordAttempt="Carne" />
            {/* <AttemptRow attemptRowNumber={2} wordAttempt={word} />
            <AttemptRow attemptRowNumber={3} wordAttempt={word} />
            <AttemptRow attemptRowNumber={4} wordAttempt={word} />
            <AttemptRow attemptRowNumber={5} wordAttempt={word} /> */}
        </Grid>
    )
}

export default GuessRows