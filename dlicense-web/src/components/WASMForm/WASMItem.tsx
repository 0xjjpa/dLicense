import { StarIcon } from "@chakra-ui/icons"
import { Badge, Box, Text, Flex } from "@chakra-ui/react"
import { dLicenseApp, dLicenseUDL } from "../../types/dlicense"
import { parseLicenseFee } from "../../helpers/udl"

type TagsMap = {
  [K in dLicenseUDL]: string
}

export const WASMItem = ({ app }: { app: dLicenseApp }) => {
  const property = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Rear view of modern home with pool',
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  }

  const tags = app.node.tags.reduce((prev, curr) => ({ [curr.name]: curr.value, ...prev }), {} as TagsMap);
  const id = app.node.id;
  console.log("Tags", tags);

  return (
    <Flex borderWidth='1px' borderRadius='lg'>
      <Flex
        bg='gray.100'
        p='5'
        maxH='sm'
        textAlign={'center'}
        rounded={'md'}
        m="2"
        flexDir={'column'}
        justify={'center'}
        alignItems={'center'}
        _hover={{ bg: 'gray.200' }}
        _dark={{
          bg: 'none',
          color: 'white',
          borderColor: 'white.900',
          borderWidth: '1px'
        }}
      >
        <Text fontFamily={'mono'}>WASM Thumbnail</Text>
      </Flex>
      <Box py='4' px='2'>
        <Box display='flex' alignItems='baseline'>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
          >
            {`${id.substring(0, 20)}...`}
          </Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {tags.Title}
        </Box>

        <Box>
          {parseLicenseFee(tags["License-Fee"]).label}
          <Box as='span' color='gray.600' _dark={{
            bg: 'none',
            color: 'gray.500',
          }} fontSize='sm'>
            / {parseLicenseFee(tags["License-Fee"]).amount} {tags.Currency}
          </Box>
        </Box>

        <Box display='flex' mt='2' alignItems='center'>
          <Text fontFamily={'mono'} fontSize={'xs'}>{`${tags["Payment-Address"].substring(0, 6)}...${tags["Payment-Address"].substring(tags["Payment-Address"].length - 6, tags["Payment-Address"].length)}`}</Text>
        </Box>
        <Box textAlign={'left'} mt="2">
          <Badge borderRadius='full' px='4' colorScheme='green'>
            {tags["Content-Type"]}
          </Badge>
        </Box>
      </Box>
    </Flex>
  )
}