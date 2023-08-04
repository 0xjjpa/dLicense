import { useContext, useEffect, useRef, useState } from "react";
import { FileManagerContext } from "./FileManagerContext";
import { Button, Flex, IconButton, Text, Input } from "@chakra-ui/react";
import { NotAllowedIcon } from "@chakra-ui/icons";

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
    softwareBinary ?
      <Flex gap='2'>
        <Text fontFamily={'mono'} fontSize={'md'}>{fileName}</Text>
        <IconButton
          onClick={() => dispatch({ type: 'REMOVE_SOFTWARE_BINARY_FILE' })}
          isRound={true}
          variant='solid'
          colorScheme='red'
          aria-label='Remove'
          size={'xs'}
          icon={<NotAllowedIcon />}
        />
      </Flex> : <div>
        <Input
          type="file"
          ref={hiddenFileInput}
          onChange={handleFileUpload}
          accept=".wasm"
          style={{ display: "none" }}
        />
        <Button
          onClick={handleClickFileUpload}
          aria-label="file upload"
        >Upload .wasm</Button>
      </div>
  )
}