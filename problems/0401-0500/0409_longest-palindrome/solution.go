// A palindrome's wings mirror, so every letter it uses must pair with a
// same-letter partner on the other side — one slot per letter, lowercase
// and uppercase separate because case matters.
func longestPalindrome(s string) int {
	counts := [52]int{}
	for i := range s {
		c := s[i]
		if c <= 'Z' {
			counts[c-'A']++
		} else {
			counts[26+c-'a']++
		}
	}
	// Pairs contribute one letter to each wing; at most one unpaired letter
	// can occupy the center, so add 1 exactly when some count is odd and
	// leave every other leftover unused.
	pairs, odd := 0, 0
	for _, count := range counts {
		pairs += count / 2
		if count%2 == 1 {
			odd = 1
		}
	}
	return pairs*2 + odd
}
