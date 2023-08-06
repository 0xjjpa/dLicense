//go:build !js && !wasm
// +build !js,!wasm

package main

import (
	"flag"
	"fmt"

	"github.com/0xjjpa/dLicense/license"
)

func main() {
	var signature string
	var address string
	flag.StringVar(&signature, "signature", "", "The signature to validate the software")
	flag.StringVar(&address, "address", "", "The address of the signer")
	flag.Parse()

	if signature == "" {
		fmt.Println("No signature provided. Use the -signature flag to validate your signature.")
		return
	}

	if address == "" {
		fmt.Println("No address provided. Use the -address flag to validate your signature.")
		return
	}

	isValid, response := license.Validate(address, signature)
	if !isValid {
		fmt.Println("License is not valid -", response)
		return
	}
	fmt.Println("License is valid", response)

	// You can call your program function here
	Program()
}
