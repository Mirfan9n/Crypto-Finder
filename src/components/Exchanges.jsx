import React from 'react';
import axios from 'axios';
import { server } from '..';
import { useEffect, useState } from 'react';
import { Container, HStack, Heading, Image, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from "./ErrorComponent"

function Exchanges() {
  const [exchanges, setExchanges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {

    const fetchExchanges = async()=>{
      try {
        const data = await axios.get(`${server}/exchanges`)
      // console.log(data.data);
        setExchanges(data.data)
        setLoading(false)
      } catch (error) {
       setLoading(false)
        setError(true)
      }
    }
    fetchExchanges()

    return () => {
    }
  }, [])
  
  if(error == true){
    return <ErrorComponent msg={"Error while Fetching Exchanges"}/>
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? <Loader /> :(
        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {
            exchanges.map((e)=>(
              // <div>{e.name}</div>
              <ExchangeCard 
              key={e.id}
                name={e.name}
                img={e.image} 
                rank={e.trust_score_rank} 
                url={e.url}
              />
            ))
          }
        </HStack>
        )
      }
    </Container>
  )
}

const ExchangeCard = ({ name, img, rank, url })=>(
  // console.log(name);
   <a href={url} target={"blank"}>
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image
        src={img}
        w={"10"}
        h={"10"}
        objectFit={"contain"}
        alt={"Exchange"}
      />
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>

      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges