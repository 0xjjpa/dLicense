import { Text, Box, SimpleGrid, } from "@chakra-ui/react";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { CTA } from "../components/CTA";
import { useEffect, useState } from "react";
import { getApps } from "../lib/dlicense";
import { WASMItem } from "../components/WASMForm/WASMItem";
import { GraphQLApps, dLicenseApp } from "../types/dlicense";


const Index = () => {
  const [apps, setApps] = useState<dLicenseApp[]>([]);
  useEffect(() => {
    const loadApps = async () => {
      const appsData: GraphQLApps = await getApps();
      const apps = appsData.data.transactions.edges;
      setApps(apps);
    }
    loadApps();
  }, [])
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

        <SimpleGrid columns={[1,1,2,2]} gap='2'>
        {
          apps.map((app) => {
            return (
              <WASMItem app={app} />
            )
          })
        }
        </SimpleGrid>
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
