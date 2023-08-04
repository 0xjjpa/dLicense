import { useReducer } from "react";
import { FileManagerUpload } from "./FileManagerUpload";
import { FileManagerContext, FileManagerReducer } from "./FileManagerContext";
import { Box, Flex } from "@chakra-ui/react";

function FileManager() {
  const [state, dispatch] = useReducer(FileManagerReducer, {
    softwareBinary: null,
  });
  return (
    <Flex justifyContent={'center'}>
      <Box mb="2">
        <FileManagerContext.Provider value={[state, dispatch]}>
          <FileManagerUpload />
        </FileManagerContext.Provider>
      </Box>
    </Flex>
  );
}

export default FileManager;