// +build js,wasm

package main

import (
	"encoding/json"
	"syscall/js"

	"github.com/0xjjpa/dLicense/license"
)

var isLicenseValid = false

func main() {
	c := make(chan struct{}, 0)

	js.Global().Set("validateLicenseKey", js.FuncOf(validateLicenseKey))
	js.Global().Set("runProgram", js.FuncOf(runProgram))

	<-c
}

func validateLicenseKey(this js.Value, args []js.Value) interface{} {
	if len(args) == 0 {
		return jsError("No license key provided")
	}

	key := args[0].String()
	go func() {
		isValid, response := license.Validate(key)
		if isValid != true {
			isLicenseValid = false
			args[1].Invoke(jsError("License is not valid: " + response))
		} else {
			isLicenseValid = true
			result := map[string]string{"transactionHash": response}
			jsonResult, _ := json.Marshal(result)
			args[1].Invoke(js.ValueOf(string(jsonResult)))
		}
	}()
	return nil
}

func runProgram(this js.Value, args []js.Value) interface{} {
	if isLicenseValid {
		Program()
		return "Running program."
	} else {
		return "Invalid license. Cannot run program."
	}
}

func jsError(message string) js.Value {
	result := map[string]string{"err": message}
	jsonResult, _ := json.Marshal(result)
	return js.ValueOf(string(jsonResult))
}

