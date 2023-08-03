import { Text, Box, Button, Flex } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWalletClient } from "wagmi";
import { WebBundlr } from "@bundlr-network/client";

import { Hero } from "../components/Hero";
import { Container } from "../components/Container";
import { Main } from "../components/Main";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { CTA } from "../components/CTA";
import { useEffect, useState } from "react";

const Index = () => {
  const [currentBundlr, setBundlr] = useState<WebBundlr>();
  const { data: walletClient, isError, isLoading } = useWalletClient()
  const account = useAccount();

  useEffect(() => {
    const loadBundlr = async () => {
      // const provider = {};
      // console.log("Loading Bundler w/Provider", provider);
      // const bundlr = new WebBundlr("https://node1.bundlr.network", "matic", walletClient);
      // await bundlr.ready();
      // setBundlr(bundlr);
    };
    account && loadBundlr();
  }, [account, walletClient]);

  const handleDemoBundlrUpload = async () => {
    const dataToUpload = "GM world."; // String to upload
    console.log("Trying to upload...", currentBundlr);
    try {
      if (currentBundlr) {
        const response = await currentBundlr.upload(dataToUpload);
        console.log(`Data uploaded ==> https://arweave.net/${response.id}`);
      }
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

        {account && (
          <>
            <Button onClick={handleDemoBundlrUpload}>
              Upload sample to Bundlr
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
