// Fix one position at a time; within that position, hash every word with
// that single character masked out.
func differByOne(words []string) bool {
	n := len(words)
	if n < 2 {
		return false
	}
	length := len(words[0])
	for pos := 0; pos < length; pos++ {
		seen := make(map[string]bool, n)
		for _, word := range words {
			masked := word[:pos] + "*" + word[pos+1:]
			// A repeat means two words agree everywhere except pos; since
			// every word is unique, they must differ there and nowhere else.
			if seen[masked] {
				return true
			}
			seen[masked] = true
		}
	}
	return false
}
