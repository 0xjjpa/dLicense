import { Text, Box, Flex } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { CTA } from "../components/CTA";
import { WASMForm } from "../components/WASMForm/WASMForm";

const Index = () => {
  return (
    <Container height="100vh">
      <Hero />
      <Main>
        <Text color="text" textAlign={"center"} fontFamily={"mono"}>
          For developers.
        </Text>

        <Box>
          <Text fontSize="sm">
            Upload a software application (e.g., a WASM-binary) and select the
            amount you are looking to charge for the usage of your application.
          </Text>
        </Box>
        <Flex justifyContent={'center'}>
          <ConnectButton />
        </Flex>

        <WASMForm />
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
};

export default Index;
