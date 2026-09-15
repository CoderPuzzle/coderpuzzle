func longestSubsequence(s string, k int) int {
	// k <= 1e9 < 2^30, so a cost of 1<<length never fits once length
	// reaches 30; the cap keeps the shift small.
	value := 0
	length := 0
	for index := len(s) - 1; index >= 0; index-- {
		if s[index] == '0' {
			length++
		} else if length < 30 && value+(1<<length) <= k {
			value += 1 << length
			length++
		}
	}
	return length
}
