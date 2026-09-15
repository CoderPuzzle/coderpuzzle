// Match each word in order against the front of s: a prefix string is exactly
// the concatenation of some first-k words, so once s is fully consumed by
// exact word matches it must be one.
func isPrefixString(s string, words []string) bool {
	i := 0
	for _, word := range words {
		if i+len(word) > len(s) || s[i:i+len(word)] != word {
			return false
		}
		i += len(word)
		if i == len(s) {
			return true
		}
	}
	return false
}
