package license

import (
	"regexp"
)

// Validate accepts a license key and returns an error if it's invalid.
func Validate(licenseKey string) bool {
	match, _ := regexp.MatchString(`^\w{8}-\w{4}-4\w{3}-[89aAbB]\w{3}-\w{12}$`, licenseKey)

	if !match {
		return false
	}

	return true
}
