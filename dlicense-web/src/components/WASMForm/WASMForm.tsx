import { Box, FormControl, Text, FormHelperText, FormLabel, Input, SimpleGrid, Flex, Button, useToast } from "@chakra-ui/react"
import FileManager from "./FileManager/FileManager"
import { useWASMStore } from "./WASMStore"
import { useEffect, useState } from "react"
import { useSignMessage, useAccount } from "wagmi"

export const WASMForm = () => {
  const toast = useToast()
  const [messageToSign, setMessageToSign] = useState("")
  const { data: signedMessage, signMessage } = useSignMessage({ message: messageToSign });
  const account = useAccount();
  const file = useWASMStore((state) => state.file)
  const [projectName, setProjectName] = useState('')
  const [paymentAddress, setPaymentAddress] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const sendFile = async () => {
    console.log("FILE", file);
    const formData = new FormData();
    const blob = new Blob([file], {type: 'application/wasm'});
    formData.append('file', blob, file.name);
    formData.append('name', projectName);
    formData.append('address', paymentAddress);

    const res = await (await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })).json()
    console.log("RESPONSE", res);
    setIsLoading(false);
    if (res.response) {
      toast({
        title: 'Binary uploaded.',
        description: `Application has been uploaded with id: ${res.response}`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    signedMessage && sendFile();
  }, [signedMessage])

  useEffect(() => {
    messageToSign.length > 0 && signMessage();
  }, [messageToSign])

  const handleSignDemo = async () => {
    try {
      if (!signedMessage) {
        setMessageToSign(`Submitting ${projectName} with payment address ${paymentAddress}`);
      } else {
        sendFile();
      }
      
    } catch (e) {
      console.log("Error uploading file ", e);
    }
  };

  return (
    <>{account?.address && (
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
        <>
          <Button isLoading={isLoading} colorScheme={'blue'} disabled={!file} opacity={!file && '0.5'} onClick={() => {
            setIsLoading(true);
            file && handleSignDemo()
            setTimeout(() => {
              setIsLoading(false)
              toast({
                title: 'Binary upload timed out.',
                description: `An error or something else timed out the upload.`,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            }, 10000);
          }}>
            Submit form.
          </Button>
        </>
      </>
    )}
    </>
  )
}