import "strings"

// A single global replacement is the whole algorithm: the input is a valid
// IPv4 address, so every '.' sits between numeric segments and each one
// becomes "[.]".
func defangIPaddr(address string) string {
	return strings.ReplaceAll(address, ".", "[.]")
}
