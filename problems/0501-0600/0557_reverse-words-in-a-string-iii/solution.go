// Go strings are immutable, so the scan runs on a byte slice — the honest
// equivalent of the in-place algorithm. Word boundaries are located with one
// pass and only word positions are ever written.
func reverseWords(s string) string {
	chars := []byte(s)
	n := len(chars)
	start := 0
	for start < n {
		end := start
		for end < n && chars[end] != ' ' {
			end++
		}
		// chars[start:end] is one word: reverse it with two pointers.
		lo, hi := start, end-1
		for lo < hi {
			chars[lo], chars[hi] = chars[hi], chars[lo]
			lo++
			hi--
		}
		start = end + 1
	}
	return string(chars)
}
