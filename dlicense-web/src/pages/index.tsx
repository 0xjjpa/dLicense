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
        A licensing protocol for software delivery, distribution and payments.
      </Text>

      <Box>
        <Text fontSize="sm">
          <Code>dLicense</Code> is born out of the need for developers to
          publish and distribute applications to their users using an open store
          that does not take a huge cut out of creators, yet ensures their
          solutions come from the right developer, and can be used only after a
          successful payment using the Arweave UDL.
        </Text>
      </Box>

      <List spacing={2} my={0} color="text" textAlign={'center'}>
        <ListItem>
          <ListIcon as={WarningIcon} color="red.500" />
          Software Licensing solutions: centralized, expensive, permisionned.
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <Code>dLicense</Code>: open-source, decentralized, accessible.
        </ListItem>
      </List>
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
