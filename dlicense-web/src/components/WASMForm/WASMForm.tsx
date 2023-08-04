import { Box, FormControl, Text, FormHelperText, FormLabel, Input, SimpleGrid, Flex } from "@chakra-ui/react"
import FileManager from "../FileManager/FileManager"

export const WASMForm = () => {
  return (
    <SimpleGrid columns={[1, 2, 2, 2]}>
      <Box gap='4' p='2' m='2'>
        <FileManager />
        <Text fontSize={'xs'}>A WASM-based library is a compiled binary able to be used within the context of a website.</Text>
      </Box>
      <Flex gap='4' p='2' m='2' flexDir={'column'}>
        <FormControl>
          <FormLabel>Name of project</FormLabel>
          <Input type='text' />
          <FormHelperText>How is your project named?</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel>Payment</FormLabel>
          <Input type='text' />
          <FormHelperText>Amount of USDC you want to charge for a once fee.</FormHelperText>
        </FormControl>
      </Flex>
    </SimpleGrid>)
}