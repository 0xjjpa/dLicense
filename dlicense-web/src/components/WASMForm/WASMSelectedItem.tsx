import { useEffect, useState } from "react";
import { dLicenseApp, dLicenseTagsMap } from "../../types/dlicense";
import { Flex, SimpleGrid, Text, Box } from "@chakra-ui/react";
import { KwilDataResponse } from "../../types/kwil";

export const WASMSelectedItem = ({ app }: { app: dLicenseApp }) => {
  const tags = app.node.tags.reduce((prev, curr) => ({ [curr.name]: curr.value, ...prev }), {} as dLicenseTagsMap);
  const id = app.node.id;
  const [hasKwilId, setHasKwilId] = useState(false);

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
  return (
    <SimpleGrid columns={[1, 1, 1, 1]} gap='2'>
      <Flex justify={'left'} align={'center'} gap='2'>
        <Text as='h3' fontSize={'xl'}>{tags["Title"]}</Text>
        <Box bg={hasKwilId ? 'green' : 'red'} rounded='50%' h='12px' w='12px'></Box>
      </Flex>
      <Flex gap='1' flexDir='column' fontSize={'sm'}>
        <Text>Connected Payee: None.</Text>
        <Text>Paid by current connected owner: No.</Text>
      </Flex>
    </SimpleGrid>
  );
}