import { Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";

export const Hero = ({ title }: { title: string }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    py={["2rem", "4rem", "6rem", "6rem"]}
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    bgClip="text"
  >
    <Link href="/">
      <Heading fontSize="6vw">{title}</Heading>
    </Link>
  </Flex>
);

Hero.defaultProps = {
  title: "dLicense",
};
