import { Box, ButtonSpinner, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

function Loader() {
  return (
    <VStack h="90vh" justifyContent="center" >
        <Box transform={"scale(8)"}>
            <Spinner size={"xl"}/>
        </Box>
    </VStack>
  )
}

export default Loader