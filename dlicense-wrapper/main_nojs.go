// +build !js,!wasm

package main

import (
	"flag"
	"fmt"

	"github.com/0xjjpa/dLicense/license"
)

func main() {
	var clientAddress string
	flag.StringVar(&clientAddress, "address", "", "The license key to validate")
	flag.Parse()

	if clientAddress == "" {
		fmt.Println("No license key provided. Use the -key flag to provide a license key.")
		return
	}

	isValid, response := license.Validate(clientAddress)
	if isValid != true {
		fmt.Println("License is not valid", response)
		return
	}
	fmt.Println("License is valid", response)

	// You can call your program function here
	Program()
}

// Add your Program function or call your desired function here
func Program() {
	fmt.Println("Running program.")
}
