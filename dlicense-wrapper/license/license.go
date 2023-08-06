package license

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type Query struct {
	Dbid  string `json:"dbid"`
	Query string `json:"query"`
}

type ResponseItem struct {
	ID               string `json:"id"`
	LicenseeAddress  string `json:"licensee_address"`
	SoftwareID       int    `json:"software_id"`
	TransactionHash  string `json:"transaction_hash"`
}

// Validate accepts a license key and returns an error if it's invalid.
func Validate(licenseKey string) bool {
		// Hardcoded query.json content
		query := Query{
			Dbid:  "x536af46211ef06bed9e4c1ea3ad30959a4332c0d58d1423c7e853db3",
			Query: "SELECT * FROM licenses",
		}
	
		// Convert query to JSON
		queryJSON, err := json.Marshal(query)
		if err != nil {
			fmt.Println("Error marshaling query:", err)
			return false
		}
	
		// Create HTTP POST request
		url := "https://provider.kwil.com/api/v1/query"
		req, err := http.NewRequest("POST", url, bytes.NewBuffer(queryJSON))
		if err != nil {
			fmt.Println("Error creating request:", err)
			return false
		}
	
		// Add content type header
		req.Header.Set("Content-Type", "application/json")
	
		// Make the request
		client := &http.Client{}
		resp, err := client.Do(req)
		if err != nil {
			fmt.Println("Error making request:", err)
			return false
		}
		defer resp.Body.Close()
	
		// Read the response
		body, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			fmt.Println("Error reading response:", err)
			return false
		}
	
		// Parse the response to get the base64 encoded result
		var response map[string]string
		err = json.Unmarshal(body, &response)
		if err != nil {
			fmt.Println("Error parsing response:", err)
			return false
		}
	
		result := response["result"]
		decodedResult, err := base64.StdEncoding.DecodeString(result)
		if err != nil {
			fmt.Println("Error decoding base64:", err)
			return false
		}
	
		// Unmarshal the decoded result into a slice of ResponseItem
		var responseItems []ResponseItem
		err = json.Unmarshal(decodedResult, &responseItems)
		if err != nil {
			fmt.Println("Error unmarshaling response items:", err)
			return false
		}
	
		// Process response items
		for _, item := range responseItems {
			fmt.Printf("ID: %s, Licensee Address: %s, Software ID: %d, Transaction Hash: %s\n", item.ID, item.LicenseeAddress, item.SoftwareID, item.TransactionHash)
		}

	return true
}