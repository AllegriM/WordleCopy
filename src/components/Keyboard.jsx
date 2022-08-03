import { Button, Flex, Stack, Text } from "@chakra-ui/react"


export const keys = ['q', 'w', 'e', 'r',
    't', 'y', 'u', 'o',
    'p', 'i', 'a', 's',
    'd', 'f', 'g', 'h',
    'j', 'k', 'l', 'z',
    'x', 'c', 'v', 'b',
    'n', 'm']

function Keyboard() {

    return (
        // Tecla
        <Stack h='auto' w='100%'>
            <Stack maxW='500px' margin='0 auto'>
                <Flex gap='.25em' justifyContent='center'>
                    {
                        keys.slice(0, 9).map((key, index) => {
                            return (
                                <Button key={index} flexGrow='1' variant='solid' h='56px' bg='#d3d6da' opacity='0.8' borderRadius='10px' color='black' align='center' justify='center'>
                                    <Text fontSize='1.05rem'>{key.toUpperCase()}</Text>
                                </Button>
                            )
                        })
                    }
                </Flex>
                <Flex gap='.25em' justifyContent='center'>
                    {
                        keys.slice(10, 19).map((key, index) => {
                            return (
                                <Button key={index} flexGrow='1' variant='solid' h='56px' bg='#d3d6da' opacity='0.8' borderRadius='10px' color='black' align='center' justify='center'>
                                    <Text fontSize='1.05rem'>{key.toUpperCase()}</Text>
                                </Button>
                            )
                        })
                    }
                </Flex>
                <Flex gap='.25em' justifyContent='center'>
                    <Button flexGrow='1' variant='solid' h='56px' w='auto' bg='#d3d6da' opacity='0.8' borderRadius='10px' color='black' align='center' justify='center'>
                        <Text>Enviar</Text>
                    </Button>
                    {
                        keys.slice(19, 27).map((key, index) => {
                            return (
                                <Button key={index} flexGrow='1' variant='solid' h='56px' bg='#d3d6da' opacity='0.8' borderRadius='10px' color='black' align='center' justify='center'>
                                    <Text fontSize='1.05rem'>{key.toUpperCase()}</Text>
                                </Button>
                            )
                        })
                    }
                    <Button flexGrow='1' variant='solid' h='56px' w='auto' bg='#d3d6da' opacity='0.8' borderRadius='10px' color='black' align='center' justify='center'>
                        <svg className="deleteIcon" xlink="http://www.w3.org/1999/xlink" stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" width="35" height="30">
                            <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" stroke="#172B4D" fill="none" strokeWidth="2px"></path>
                            <line x1="18" y1="9" x2="12" y2="15" stroke="#172B4D" fill="none" strokeWidth="2px"></line>
                            <line x1="12" y1="9" x2="18" y2="15" stroke="#172B4D" fill="none" strokeWidth="2px"></line>
                        </svg>
                    </Button>
                </Flex>
            </Stack>
        </Stack>
    )
}

export default Keyboard