// Straight from the definition: for each start, extend the substring
// while maintaining the vowel-minus-consonant balance. Balance 0 means
// equal vowel and consonant counts, each equal to half the length, so the
// divisibility test is ((L / 2) * (L / 2)) % k == 0.
func beautifulSubstrings(s string, k int) int {
	isVowel := func(c byte) bool {
		return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'
	}
	n := len(s)
	total := 0
	for i := 0; i < n; i++ {
		balance := 0
		for j := i; j < n; j++ {
			if isVowel(s[j]) {
				balance++
			} else {
				balance--
			}
			if balance == 0 {
				half := (j - i + 1) / 2
				if (half*half)%k == 0 {
					total++
				}
			}
		}
	}
	return total
}
