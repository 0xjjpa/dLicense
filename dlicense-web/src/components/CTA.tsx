import { Button } from "@chakra-ui/react";
import Link from "next/link";

import { Container } from "./Container";

export const CTA = () => (
  <Container
    justifyContent={'space-evenly'}
    flexDirection="row"
    position="fixed"
    bottom={0}
    width="full"
    maxWidth="3xl"
    py={3}
  >
    <Link href="/developers" passHref>
      <Button
        variant="outline"
        colorScheme="green"
        rounded="button"
        flexGrow={1}
        mx={2}
        width="full"
      >
        For developers
      </Button>
    </Link>
    <Link href="/consumers" passHref>
      <Button
        variant="solid"
        colorScheme="green"
        rounded="button"
        flexGrow={3}
        mx={2}
        width="full"
      >
        For consumers
      </Button>
    </Link>
  </Container>
);
