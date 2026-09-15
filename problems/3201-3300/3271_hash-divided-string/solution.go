// The chunks are the fixed windows of k characters because n is a multiple
// of k: each pass reads one window, adds up its characters' alphabet
// indices, and appends the letter at index sum % 26. The running total never
// exceeds 25 * 100 = 2500, so ordinary integers suffice, and one linear pass
// visits every character exactly once.
func stringHash(s string, k int) string {
	result := make([]byte, 0, len(s)/k)
	for base := 0; base < len(s); base += k {
		total := 0
		for j := base; j < base+k; j++ {
			total += int(s[j] - 'a')
		}
		result = append(result, byte('a'+total%26))
	}
	return string(result)
}
