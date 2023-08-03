import {
    Link as ChakraLink,
    Text,
    Code,
    List,
    ListIcon,
    ListItem,
    Box,
  } from "@chakra-ui/react";
  import { CheckCircleIcon, LinkIcon, WarningIcon } from "@chakra-ui/icons";
  
  import { Hero } from "../components/Hero";
  import { Container } from "../components/Container";
  import { Main } from "../components/Main";
  import { DarkModeSwitch } from "../components/DarkModeSwitch";
  import { Footer } from "../components/Footer";
  import { CTA } from "../components/CTA";
  
  const Index = () => (
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
      </Main>
  
      <DarkModeSwitch />
      <Footer>
        <Text fontSize={"xs"}>
          A submission for the Arweave Community Hackathon.
        </Text>
      </Footer>
      <CTA />
    </Container>
  );
  
  export default Index;
  