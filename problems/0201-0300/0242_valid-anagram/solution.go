// An anagram is a rearrangement: both strings must hold exactly the same
// letters with the same counts. The constraints promise lowercase English
// letters, so 26 counters, one per letter, capture the multiset.
func isAnagram(s string, t string) bool {
	if len(s) != len(t) {
		// Different lengths can never share the same multiset of letters.
		return false
	}
	var counts [26]int
	for index := 0; index < len(s); index++ {
		counts[s[index]-'a']++
		counts[t[index]-'a']--
	}
	// A nonzero slot is a letter the two strings disagreed on.
	for _, count := range counts {
		if count != 0 {
			return false
		}
	}
	return true
}
