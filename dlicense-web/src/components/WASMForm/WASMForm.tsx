import { Box, FormControl, Text, FormHelperText, FormLabel, Input, SimpleGrid, Flex, Button } from "@chakra-ui/react"
import FileManager from "./FileManager/FileManager"
import { useWASMStore } from "./WASMStore"
import { useEffect, useState } from "react"
import { useSignMessage, useAccount } from "wagmi"

export const WASMForm = () => {
  const { data: signedMessage, signMessage } = useSignMessage({
    message: 'gm wagmi frens',
  })
  const account = useAccount();
  const file = useWASMStore((state) => state.file)
  const [projectName, setProjectName] = useState('')
  const [paymentAddress, setPaymentAddress] = useState('')

  useEffect(() => {
    console.log("Signed Message", signedMessage);
  }, [signedMessage])

  useEffect(() => {
    console.log("FILE", file);
  }, [file])

  const handleSignDemo = async () => {
    try {
      signMessage();
    } catch (e) {
      console.log("Error uploading file ", e);
    }
  };

  return (
    <>
      <SimpleGrid columns={[1, 2, 2, 2]}>
        <Box gap='4' p='2' m='2'>
          <FileManager />
          <Text fontSize={'xs'}>A WASM-based library is a compiled binary able to be used within the context of a website.</Text>
        </Box>
        <Flex gap='4' p='2' m='2' flexDir={'column'}>
          <FormControl>
            <FormLabel>Name of project</FormLabel>
            <Input type='text' placeholder='BLAKE3' onChange={(e) => setProjectName(e.target.value)} value={projectName} />
            <FormHelperText>How is your project named?</FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Payment Address</FormLabel>
            <Input type='text' placeholder='0xd837eA...' onChange={(e) => setPaymentAddress(e.target.value)} value={paymentAddress} />
            <FormHelperText>Address where you would want to get the deposits of MATIC as payments for your software.</FormHelperText>
          </FormControl>
        </Flex>
      </SimpleGrid>
      {account?.address && (
        <>
          <Button disabled={!file} opacity={!file && '0.5'} onClick={() => file && handleSignDemo()}>
            Submit form.
          </Button>
        </>
      )}
    </>
  )
}