import { useContext, useEffect, useRef, useState } from "react";
import { useLocalStorage } from 'usehooks-ts'
import { Flex, IconButton, Text, Input, Box, Icon } from "@chakra-ui/react";
import { NotAllowedIcon } from "@chakra-ui/icons";
import { PiUploadDuotone } from 'react-icons/pi'

import { FileManagerContext } from "./FileManagerContext";
import { useWASMStore } from "../WASMStore";


export const FileManagerUpload = () => {
  const context = useContext(FileManagerContext);

  const [fileName, setFileName] = useState("");
  if (!context) throw new Error("FIELUploadCer must be used within a FIELStoreProvider");

  const hiddenFileInput = useRef(null);

  const [state, dispatch] = context;
  const { softwareBinary } = state;

  const handleFileUpload = (event: { target: HTMLInputElement; }) => {
    if (event.target.files && event.target.files[0]) {
      const file = (event.target as HTMLInputElement).files[0];
      setFileName(file.name);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        dispatch({ type: 'SET_SOFTWARE_BINARY_FILE', payload: fileReader.result });
        useWASMStore.setState({ file: fileReader.result })
      };
      fileReader.readAsBinaryString(file);
    }
  };

  useEffect(() => {
    console.debug('(📥,ℹ️) File info,', softwareBinary);
  }, [softwareBinary])

  const handleClickFileUpload = () => {
    hiddenFileInput.current.click();
  };

  return (

    <Box>
      <Input
        type="file"
        ref={hiddenFileInput}
        onChange={handleFileUpload}
        accept=".wasm"
        style={{ display: "none" }}
      />
      <Flex
        cursor={'pointer'}
        onClick={() => !softwareBinary && handleClickFileUpload()}
        aria-label="file upload"
        bg='gray.100'
        p='10'
        minH='200'
        textAlign={'center'}
        rounded={'md'}
        flexDir={'column'}
        justify={'center'}
        alignItems={'center'}
        _hover={{ bg: 'gray.200' }}
        _dark={{
          bg: 'none',
          color: 'white',
          borderColor: 'white.900',
          borderWidth: '1px'
        }}
      >
        {softwareBinary ?
          <Flex gap='2'>
            <Text fontFamily={'mono'} fontSize={'md'}>{fileName}</Text>
            <IconButton
              onClick={() => { dispatch({ type: 'REMOVE_SOFTWARE_BINARY_FILE' }); useWASMStore.setState({ file: null }) }}
              isRound={true}
              variant='solid'
              colorScheme='red'
              aria-label='Remove'
              size={'xs'}
              icon={<NotAllowedIcon />}
            />
          </Flex> :
          <>
            <Text fontFamily={'mono'} mb='2'>Upload your WASM library.</Text>
            <Icon as={PiUploadDuotone} />
          </>
        }
      </Flex>
    </Box>
  )
}