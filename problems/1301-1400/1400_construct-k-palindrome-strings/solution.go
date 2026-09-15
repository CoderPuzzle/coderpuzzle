func canConstruct(s string, k int) bool {
	// Splitting all of s across k palindromes needs one character per string
	// at minimum, and every letter with an odd count must anchor the center
	// of a different palindrome. Both bounds are achievable simultaneously,
	// so checking them is enough.
	if len(s) < k {
		return false
	}
	var counts [26]int
	for index := 0; index < len(s); index++ {
		counts[s[index]-'a']++
	}
	odd := 0
	for _, count := range counts {
		odd += count % 2
	}
	return odd <= k
}
