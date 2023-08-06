// +build !js,!wasm

package main

import (
	"flag"
	"fmt"

	"github.com/0xjjpa/dLicense/license"
)

func main() {
	var licenseKey string
	flag.StringVar(&licenseKey, "key", "", "The license key to validate")
	flag.Parse()

	if licenseKey == "" {
		fmt.Println("No license key provided. Use the -key flag to provide a license key.")
		return
	}

	isValid := license.Validate(licenseKey)
	if isValid != true {
		fmt.Println("License is not valid")
		return
	}
	fmt.Println("License is valid")

	// You can call your program function here
	Program()
}

// Add your Program function or call your desired function here
func Program() {
	fmt.Println("Running program.")
}
