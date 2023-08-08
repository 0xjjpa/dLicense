import { Text, Box, SimpleGrid, Flex } from "@chakra-ui/react";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { CTA } from "../components/CTA";
import { useCallback, useEffect, useState } from "react";
import { getApps } from "../lib/dlicense";
import { WASMItem } from "../components/WASMForm/WASMItem";
import { GraphQLApps, dLicenseApp } from "../types/dlicense";
import { WASMSelectedItem } from "../components/WASMForm/WASMSelectedItem";
import { RepeatIcon, SpinnerIcon } from "@chakra-ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";


const Index = () => {
  const [apps, setApps] = useState<dLicenseApp[]>([]);
  const [isLoadingRefresh, setIsLoadingRefresh] = useState(false);
  const [selectedWASMItem, setSelectedWASMItem] = useState<dLicenseApp>();

  const loadApps = useCallback(async () => {
    const appsData: GraphQLApps = await getApps();
    const apps = appsData.data.transactions.edges;
    setApps(apps);
  }, [apps])

  useEffect(() => {
    loadApps();
  }, [])

  const handleSelectWASMItem = (app: dLicenseApp) => {
    console.log("App", app);
    setSelectedWASMItem(app);
  }

  const handleRefresh = async () => {
    setIsLoadingRefresh(true);
    const timeout = setTimeout(() => setIsLoadingRefresh(false), 10000);
    await loadApps();
    setIsLoadingRefresh(false);
    clearTimeout(timeout);
  }

  return (
    <Container height="100vh">
      <Hero />
      <Main>
        <Text color="text" textAlign={"center"} fontFamily={"mono"}>
          For consumers.
        </Text>

        <Box>
          <Text fontSize="sm">
            Find software with a clear license model you can use (or reuse) for your own or commercial
            products and projects. Pay for it knowing that the creator of the software will be the one
            getting most of the funds.
          </Text>
        </Box>

        <Flex justifyContent={'center'}>
          <ConnectButton />
        </Flex>

        {
          apps.length > 0 ? (
            <SimpleGrid columns={[1, 1, 2, 2]} gap='2'>
              {
                apps.map((app) => {
                  return (
                    <Box key={app.node.id} onClick={() => handleSelectWASMItem(app)}>
                      <WASMItem app={app} />
                    </Box>
                  )
                })
              }
            </SimpleGrid>)
            :
            <Flex justifyContent={'center'} alignItems={'center'}>
              <Text fontSize={'md'} textAlign={'center'}>No apps had been found in this category.</Text>
              {!isLoadingRefresh ? <RepeatIcon ml='2' onClick={handleRefresh} cursor={'pointer'} /> : <SpinnerIcon ml='2' /> }
            </Flex>
        }


        {selectedWASMItem &&
          <Box>
            <WASMSelectedItem app={selectedWASMItem} />
          </Box>
        }
      </Main>

      <DarkModeSwitch />
      <Footer>
        <Text fontSize={"xs"}>
          A submission for the Arweave Community Hackathon.
        </Text>
      </Footer>
      <CTA />
    </Container>
  )
};

export default Index;
