// Two pointers walk inward from both ends. Each skips the characters the
// rules erase, so one lowercase comparison per surviving pair decides the
// answer and no filtered copy of s is ever built.
func isPalindrome(s string) bool {
	left, right := 0, len(s)-1
	for left < right {
		// Punctuation and spaces are removed by the normalization, so they
		// can never break the mirror: step past them.
		for left < right && !isAlphanumeric(s[left]) {
			left++
		}
		for left < right && !isAlphanumeric(s[right]) {
			right--
		}
		// Comparing lowercased characters applies the case rule in place;
		// digits lower to themselves, so one path covers both kinds.
		if lower(s[left]) != lower(s[right]) {
			return false
		}
		left++
		right--
	}
	return true
}

// Explicit ASCII ranges instead of library helpers: digits, then letters.
func isAlphanumeric(c byte) bool {
	return c >= '0' && c <= '9' || c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z'
}

// Uppercase folds onto lowercase by its distance from 'A'; every other
// character, digits included, maps to itself.
func lower(c byte) byte {
	if c >= 'A' && c <= 'Z' {
		return c + 'a' - 'A'
	}
	return c
}
