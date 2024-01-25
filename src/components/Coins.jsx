import React from 'react';
import axios from 'axios';
import { server } from '..';
import { useEffect, useState } from 'react';
import { Button, Container, HStack, Heading, Image, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent'
import CoinCard from './CoinCard';

function Coins() {
  const [Coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [currency, setCurrency] = useState("inr")

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage= (page)=>{
    setPage(page)
    setLoading(true)
  }

  const btns = new Array(125).fill(1)

  useEffect(() => {

    const fetchCoins = async()=>{
      try {
        const data = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
          )
        setCoins(data.data)
        setLoading(false)
      } catch (error) {
       setLoading(false)
        setError(true)
      }
    }
    fetchCoins()
  }, [currency, page])
  
  if(error === true){
    return <ErrorComponent msg={"Error while Fetching Coins"}/>
  }
  
  return (
    <Container maxW={"container.xl"}>
      {loading ? <Loader /> :( 
        
      <>
      
      <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
        <HStack spacing={"8"}>
          <Radio value={"inr"}>  INR </Radio>
          <Radio value={"eur"}>  EUR </Radio>
          <Radio value={"usd"}>  USD</Radio>
        </HStack>
      </RadioGroup>

      <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
        {
          Coins.map((e)=>(
            
            <CoinCard 
              id= {e.id}
              key={e.id}
              name={e.name}
              price={e.current_price}
              img={e.image} 
              symbol={e.symbol} 
              url={e.url}
              currencySymbol={currencySymbol}
            />
          ))
        }
      </HStack>

      <HStack w={"full"} overflowX={"auto"} p={"8"}>
       {
        btns.map((item, index)=>(
          <Button 
            key={index}
            bgColor={"blackAlpha.900"} 
            color={"white"} 
            onClick={()=>changePage(index+1)}
          > 
          {index+1}
          </Button>

        ))
       }
      </HStack>
      </>

      
      )}
    </Container>
  )
}




export default Coins