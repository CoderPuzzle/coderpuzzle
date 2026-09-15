func makePalindrome(s string) bool {
	mismatches := 0
	left, right := 0, len(s)-1
	for left < right {
		if s[left] != s[right] {
			mismatches++
		}
		left++
		right--
	}
	return mismatches <= 2
}
