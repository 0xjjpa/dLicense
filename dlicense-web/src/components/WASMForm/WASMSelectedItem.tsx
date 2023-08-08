import { useEffect, useState } from "react";
import { dLicenseApp, dLicenseTagsMap } from "../../types/dlicense";
import { Flex, SimpleGrid, Text, Box, Code, Button } from "@chakra-ui/react";
import { KwilDataResponse } from "../../types/kwil";
import { useAccount, useSignMessage } from "wagmi";
import { useWASMStore } from "./WASMStore";
import { WASMWrapper } from "../WASMWrapper/WASMWrapper";
import { validateKey } from "../../lib/wasm";

export const WASMSelectedItem = ({ app }: { app: dLicenseApp }) => {
  const { address } = useAccount();
  const tags = app.node.tags.reduce((prev, curr) => ({ [curr.name]: curr.value, ...prev }), {} as dLicenseTagsMap);
  const id = app.node.id;
  const [hasKwilId, setHasKwilId] = useState(false);
  const [licenseId, setLicenseId] = useState('');
  const { data: signedMessage, signMessage } = useSignMessage({ message: id });

  useEffect(() => {
    const loadKwilSoftware = async () => {
      const res: KwilDataResponse = await (await fetch('/api/getSoftware', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })).json()
      if (res.response) {
        setHasKwilId(res.response.data[0].id == id)
      }
    }
    id && loadKwilSoftware();
  }, [])

  useEffect(() => {
    useWASMStore.setState({ arweaveUrl: `https://arweave.net/${id}` });
  }, [id])

  useEffect(() => {
    const loadKwilSoftware = async () => {
      const res: KwilDataResponse = await (await fetch('/api/getLicenseByIds', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ softwareId: id, address }),
      })).json()
      if (res.response && res.response.data.length > 0) {
        setLicenseId(res.response.data[0].id)
      }
    }
    address && id && loadKwilSoftware();
  }, [address])

  const handleLicenseVerificationFromSignature = async () => {
    console.log("validating...");
    const validationResponse = await validateKey({
      address,
      signature: signedMessage,
    });
    console.log("validationResponse", validationResponse);
  };

  useEffect(() => {
    signedMessage && handleLicenseVerificationFromSignature();
  }, [signedMessage])

  return (
    <SimpleGrid columns={[1, 1, 1, 1]} gap='2'>
      <Flex justify={'left'} align={'center'} gap='2'>
        <Text as='h3' fontSize={'xl'}>{tags["Title"]}</Text>
        <Box bg={hasKwilId ? 'green' : 'red'} rounded='50%' h='12px' w='12px'></Box>
      </Flex>
      <Flex gap='1' flexDir='column' fontSize={'sm'}>
        <Text>Id: <Code px='2'>{id}</Code></Text>
        <Text>Connected Payee: None.</Text>
        <Text>Paid by current connected owner: {licenseId ? 'Yes' : 'No'}.</Text>
        <Text>Connected account: <Code px='2'>{address ? address : 'None'}</Code></Text>
        <Text>License: <Code px='2'>{licenseId ? licenseId : 'None'}</Code></Text>
        <Button onClick={() => signMessage()}>Validate key</Button>
        <Button onClick={() => window.runProgram()}>Run Program</Button>
      </Flex>
      <WASMWrapper />
    </SimpleGrid>
  );
}