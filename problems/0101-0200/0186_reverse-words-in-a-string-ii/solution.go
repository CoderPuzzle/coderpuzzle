// Go strings are immutable, so the flips run on a byte slice — the honest
// equivalent of the in-place algorithm. Flip the whole line once, then
// re-flip each word.
func reverseWords(s string) string {
	chars := []byte(s)
	reverseRange(chars, 0, len(chars)-1)
	n, start := len(chars), 0
	for stop := 0; stop <= n; stop++ {
		// A word ends at each separating space (and at the end of the line).
		if stop == n || chars[stop] == ' ' {
			reverseRange(chars, start, stop-1)
			start = stop + 1
		}
	}
	return string(chars)
}

// Flip a range of the buffer in place, endpoints included.
func reverseRange(chars []byte, lo, hi int) {
	for lo < hi {
		chars[lo], chars[hi] = chars[hi], chars[lo]
		lo++
		hi--
	}
}
