import { Badge, Box, Button, Center, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack,} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { server } from "../index";
import Loader from './Loader'
import axios from 'axios'
import ErrorComponent from './ErrorComponent';
import Chart from './Chart';

function CoinDetails() {
  const [coin, setCoin] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currency, setCurrency] = useState("inr")
  const [days, setDays] = useState("24h")
  const [chartArray, setChartArray] = useState([])


  const btns=["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];
  const params = useParams()
  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const switchChartStats=(key)=>{
  switch (key) {
    default:
      setDays(key)
      setLoading(true)
      break;
  }
}

  useEffect(()=>{
    const fetchCoin= async ()=>{
      try {
        const data= await axios.get(
        `${server}/coins/${params.id}`
        )

        const {data:chartData}= await axios.get(
        `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        )
        setChartArray(chartData.prices)
        // console.log(chartData.prices);
      setCoin(data.data)
      setLoading(false)  
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchCoin()
  }, [ days, currency])

  if(error) return <ErrorComponent msg={`Error While Fetching ${params.id} data `}/>

  return (
    <Container maxWidth={"container.xl"}>
    {
    loading? <Loader/> : (<>
      <Box borderWidth={1} w={"full"}>
        <Chart arr={chartArray} currency={currencySymbol} days={days} />
      </Box>

      <HStack p={4} overflowX={"auto"} justifyContent={"center"}>
        {btns.map((i)=>(
          <Button key={i} onClick={()=> switchChartStats(i)} > {i} </Button>
        ))
        }
      </HStack>

      <RadioGroup value= {currency} onChange={setCurrency} p={8} >
        <Radio value={'inr'} p={4}> INR</Radio>
        <Radio value={'usd'} p={4}> USD</Radio>
        <Radio value={'eur'} p={4}> EUR</Radio>
      </RadioGroup>

      <VStack spacing={4} p={16} alignItems={'flex-start'} justifyContent={"center"} >

        <Text fontSize={"small"} alignSelf={"center"} opacity={0.7}>
          Last Updated On {Date(coin.market_data.last_updated).split("G")[0]}
        </Text>
        <Image src={coin.image.large} w={16} h={16} objectFit={"contain"}  />
        
        <Stat >
        <StatLabel>{coin.name}</StatLabel>
        <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
        <StatHelpText> 
          <StatArrow type=
          {
            coin.market_data.price_change_percentage_7d > 0 ? 
            "increase" 
            :"decrease"
          }/>
          {coin.market_data.price_change_percentage_7d}%
        </StatHelpText>
        </Stat>

        <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"white"}>
          {`#${coin.market_cap_rank}`}
        </Badge>

        <CustomBar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} 
          low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
          />

        <Box p={4} w={"full"}>
          <Item title={"Max Suplly"} value={coin.market_data.max_supply} />
          <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} />
          <Item title={"Market Capital"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
          <Item title={"Market Capital"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
          <Item title={"All time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
          <Item title={"All time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
        </Box>
      
      </VStack>

    </>
    )}
    </Container>
  )
}

const Item=({title, value})=>(
  <HStack justifyContent={"space-between"} w={"full"} my={4}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)

const CustomBar= ({ high, low}) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={'teal'} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={'red'} />
        <Text fontSize={'sm'}> 24H range </Text>
      <Badge children={high} colorScheme={'green'} />
    </HStack>
  </VStack>
)


export default CoinDetails