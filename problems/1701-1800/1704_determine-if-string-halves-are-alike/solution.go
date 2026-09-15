// Only the vowel totals of the two halves matter — which vowel it is,
// where it sits, and whether it is upper- or lowercase are all irrelevant.
// One pass with a single counter: +1 for every vowel in the first half,
// -1 for every vowel in the second; equal totals land the counter back at
// exactly zero.
func halvesAreAlike(s string) bool {
	half := len(s) / 2
	balance := 0
	for i := 0; i < len(s); i++ {
		if isVowel(s[i]) {
			if i < half {
				balance++
			} else {
				balance--
			}
		}
	}
	return balance == 0
}

func isVowel(c byte) bool {
	switch c {
	case 'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U':
		return true
	}
	return false
}
