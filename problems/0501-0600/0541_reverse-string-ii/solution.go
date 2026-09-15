// Read the string as consecutive 2k-sized blocks: every block contributes
// its first k characters reversed, its last k untouched. Walking i in steps
// of 2k and reversing the window [i, min(i+k, n)) needs no special case for
// the tail — fewer than k characters left makes the window short, so
// reversing it reverses all of them, while k..2k-1 left makes the window
// exactly the first k of them.
func reverseStr(s string, k int) string {
	chars := []byte(s)
	for i := 0; i < len(chars); i += 2 * k {
		end := i + k
		if end > len(chars) {
			end = len(chars)
		}
		for lo, hi := i, end-1; lo < hi; lo, hi = lo+1, hi-1 {
			chars[lo], chars[hi] = chars[hi], chars[lo]
		}
	}
	return string(chars)
}
