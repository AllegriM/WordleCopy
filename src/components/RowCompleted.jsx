import { Stack } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { AnimatePresence } from "framer-motion"
import RowBox from "./RowBox"

const AnimatedBox = motion(Stack)

const variants = {
    hidden: { rotateY: 90 },
    show: ({delay}) => ({
        rotateY: 0,
        transition: {
            delay,
            duration: .5
        }
    })
}

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
        <AnimatePresence>
            <Stack direction='row' justify='center' mt='10px'>
                {arr.map((_, index) => {
                    return (
                        <AnimatedBox 
                        key={index}
                        custom={{delay: (index + 1) * 0.2}} 
                        variants={variants}
                        initial='hidden'
                        animate='show'
                        >
                            <RowBox word={words[index]} index={index} status={CheckLetter(words[index], index)} />
                        </AnimatedBox>
                    )
                })}
            </Stack>
        </AnimatePresence>
    )
}

export default RowCompleted

