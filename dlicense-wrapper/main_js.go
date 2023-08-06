// +build js,wasm

package main

import (
	"fmt"
	"syscall/js"

	"github.com/0xjjpa/dLicense/license"
)

var isLicenseValid = false

func main() {
	c := make(chan struct{}, 0)

	js.Global().Set("validateLicenseKey", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		if len(args) == 0 {
			fmt.Println("No license key provided")
			isLicenseValid = false
			return "No license key provided"
		}
		
		key := args[0].String()
		isValid := license.Validate(key)
		if isValid != true {
			fmt.Println("License is not valid")
			isLicenseValid = false
			return "License is not valid"
		}
		fmt.Println("License is valid")
		isLicenseValid = true
		return "ok"
	}))

	js.Global().Set("runProgram", js.FuncOf(func(this js.Value, args []js.Value) interface{} {
		if isLicenseValid {
			Program()
			return "Running program."
		} else {
			fmt.Println("Invalid license. Cannot run program.")
			return "Invalid license. Cannot run program."
		}
	}))

	<-c
}
