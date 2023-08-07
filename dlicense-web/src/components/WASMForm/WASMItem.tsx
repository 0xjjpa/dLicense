import { Badge, Box, Text, Flex } from "@chakra-ui/react"
import { dLicenseApp, dLicenseTagsMap } from "../../types/dlicense"
import { parseLicenseFee } from "../../helpers/udl"
import { abbreviate } from "../../helpers/strings"


export const WASMItem = ({ app }: { app: dLicenseApp }) => {
  const tags = app.node.tags.reduce((prev, curr) => ({ [curr.name]: curr.value, ...prev }), {} as dLicenseTagsMap);
  const id = app.node.id;

  return (
    <Flex borderWidth='1px' borderRadius='lg' _hover={{ bg: 'gray.50' }} cursor={'pointer'}>
      <Flex
        bg='gray.100'
        p='5'
        w={'150px'}
        textAlign={'center'}
        rounded={'md'}
        m="2"
        flexDir={'column'}
        justify={'center'}
        alignItems={'center'}
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
            {`${abbreviate(id)}`}
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
          <Text fontFamily={'mono'} fontSize={'xs'}>{`${abbreviate(tags["Payment-Address"])}`}</Text>
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