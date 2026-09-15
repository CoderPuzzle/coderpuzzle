// Letter i is advanced once by every shifts[j] with j >= i, so its total
// shift is the suffix sum shifts[i..n-1] — one running total on a
// right-to-left scan replaces all the prefix operations.
func shiftingLetters(s string, shifts []int) string {
	out := []byte(s)
	// 10^5 shifts of 10^9 sum to 10^14, far past int32, so the total is
	// int64.
	total := int64(0)
	for i := len(s) - 1; i >= 0; i-- {
		total += int64(shifts[i])
		// Shifts are non-negative, so % 26 lands the wrap z -> a exactly.
		out[i] = byte('a' + (int64(out[i])-'a'+total%26)%26)
	}
	return string(out)
}
