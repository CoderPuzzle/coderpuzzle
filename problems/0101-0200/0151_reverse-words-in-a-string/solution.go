// Go strings are immutable, so the sweep runs on a byte slice — the honest
// equivalent of the in-place algorithm. Flip the whole line once, then one
// compacting sweep puts each word's letters back.
func reverseWords(s string) string {
	chars := []byte(s)
	reverseRange(chars, 0, len(chars)-1)
	n, write, read := len(chars), 0, 0
	for read < n {
		// Skip the run of spaces before the next word.
		for read < n && chars[read] == ' ' {
			read++
		}
		if read == n {
			break
		}
		// One separating space between words, none before the first.
		if write > 0 {
			chars[write] = ' '
			write++
		}
		start := write
		for read < n && chars[read] != ' ' {
			chars[write] = chars[read]
			write++
			read++
		}
		// The word just copied still has its letters flipped; restore them.
		reverseRange(chars, start, write-1)
	}
	return string(chars[:write])
}

// Flip a range of the buffer in place, endpoints included.
func reverseRange(chars []byte, lo, hi int) {
	for lo < hi {
		chars[lo], chars[hi] = chars[hi], chars[lo]
		lo++
		hi--
	}
}
