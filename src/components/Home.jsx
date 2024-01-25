import { Box, Image, Text } from '@chakra-ui/react'
import React from 'react'
import btcsrc from "../asset/btc.png";
import {motion} from "framer-motion"

function Home() {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"85vh"}>
      
    <motion.div style={{
      height:"80vh",
    }}
     animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
    
    >
      <Image src={btcsrc} w={"full"} h={"full"} objectFit={"contain"}
      filter={"grayscale(1)"} />
      <Text fontSize={"6xl"} textAlign={"center"} fontWeight={"thin"} color={"whiteAlpha.700"} marginTop={"-20"}>Crypto Finder</Text>
    </motion.div>

    </Box>
  )
}

export default Home