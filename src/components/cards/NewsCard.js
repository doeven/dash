import {
    Flex,
    Text,
    Image,
    Link,
} from "@chakra-ui/react";




const NewsCard = ({img,title,date}) => {
    return (
       <Flex
       direction="column"
       borderRadius='sm'
       pb='6'
       cursor='pointer'
       
       >
           <Image src={img} flex='2' _hover={{ transform:'scale(1.07)',transition: '0.4s' , transitionTimingFunction: 'ease-out-in'}}/>
           <Text as={Link}fontSize='sm' fontWeight='bold' color='#44C768' mt='4'>{title}</Text>
           <Text fontSize='sm' color='#333' opacity='0.6' mt='2'>{date}</Text>
       </Flex>
    )
}

export default NewsCard
