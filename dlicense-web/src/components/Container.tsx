import { Flex, FlexProps } from '@chakra-ui/react'

export const Container = (props: FlexProps) => (
  <Flex
    direction="column"
    alignItems="center"
    justifyContent="flex-start"
    color="black"
    _dark={{
      bg: 'gray.800',
      color: 'white',
    }}
    transition="all 0.15s ease-out"
    {...props}
  />
)
