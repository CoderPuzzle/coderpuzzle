import "strings"

// Dashes are separators, not content: build the cleaned key by dropping them
// and uppercasing everything that remains. Only the first group may be short,
// and only when the key length leaves a remainder.
func licenseKeyFormatting(s string, k int) string {
	key := strings.ToUpper(strings.ReplaceAll(s, "-", ""))
	if key == "" {
		return ""
	}
	head := len(key) % k
	if head == 0 {
		head = k
	}
	groups := []string{key[:head]}
	for i := head; i < len(key); i += k {
		groups = append(groups, key[i:i+k])
	}
	return strings.Join(groups, "-")
}
