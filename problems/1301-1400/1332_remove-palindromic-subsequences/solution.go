func removePalindromeSub(s string) int {
	// One letter's positions form a palindrome by themselves, so two steps
	// always suffice; a single step works iff s is a palindrome.
	left, right := 0, len(s)-1
	for left < right {
		if s[left] != s[right] {
			return 2
		}
		left++
		right--
	}
	return 1
}
