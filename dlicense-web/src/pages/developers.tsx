import { Text, Box, Button, Flex } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useSignMessage, useWalletClient } from "wagmi";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { CTA } from "../components/CTA";
import { useEffect, useState } from "react";
import FileManager from "../components/FileManager/FileManager";

const Index = () => {
  const { data: signedMessage, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: 'gm wagmi frens',
  })
  const account = useAccount();

  useEffect(() => {
    console.log("Account", account);
    const loadBundlr = async () => {
      // const provider = {};
      // console.log("Loading Bundler w/Provider", provider);
      // const bundlr = new WebBundlr("https://node1.bundlr.network", "matic", walletClient);
      // await bundlr.ready();
      // setBundlr(bundlr);
    };
    account && loadBundlr();
  }, [account]);

  useEffect(() => {
    console.log("Signed Message", signedMessage);
  }, [signedMessage])

  const handleSignDemo = async () => {
    try {
      signMessage();
    } catch (e) {
      console.log("Error uploading file ", e);
    }
  };

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

        <FileManager />

        {account?.address && (
          <>
            <Button onClick={handleSignDemo}>
              Sign something.
            </Button>
          </>
        )}
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
