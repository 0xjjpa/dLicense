import { useWASMStore } from '../WASMForm/WASMStore';
import './wasm_exec.js';

import React, { useEffect } from 'react';

declare global {
  export interface Window {
      Go: any;
      validateLicenseKey: (address: string, signature: string, callback: (result: string) => void) => string
      runProgram: () => string
  }
}

async function loadWasm({ wasmURL }: { wasmURL: string }): Promise<void> {
  const goWasm = new window.Go();
  if (wasmURL) {
    const result = await WebAssembly.instantiateStreaming(fetch(wasmURL), goWasm.importObject);
    goWasm.run(result.instance);
  }
}

export const WASMWrapper: React.FC<React.PropsWithChildren<{}>> = (props) => {
  const wasmURL = useWASMStore((state) => state.arweaveUrl)
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    loadWasm({ wasmURL }).then(() => {
      setIsLoading(false);
    });
  }, [wasmURL]);

  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    );
  } else {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
};