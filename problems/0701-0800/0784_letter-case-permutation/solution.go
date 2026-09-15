func letterCasePermutation(s string) []string {
	// Interleaved list-doubling: scan s left to right; at each letter
	// every string built so far is immediately followed by its copy with
	// that one letter's case flipped.
	result := []string{s}
	for i := 0; i < len(s); i++ {
		ch := s[i]
		letter := (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')
		if !letter {
			continue
		}
		grown := make([]string, 0, len(result)*2)
		for _, current := range result {
			grown = append(grown, current)
			toggled := []byte(current)
			toggled[i] ^= 0x20
			grown = append(grown, string(toggled))
		}
		result = grown
	}
	return result
}
