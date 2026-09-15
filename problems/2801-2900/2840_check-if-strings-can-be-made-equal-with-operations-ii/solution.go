// Swapping indices whose distance is even keeps every character inside its own
// index-parity class, and any two positions of one class are directly
// swappable, so each class is freely rearrangeable. The strings can therefore
// be made equal exactly when each parity class holds the same multiset of
// characters in both strings.
func checkStrings(s1 string, s2 string) bool {
	var counts [2][26]int
	for index := 0; index < len(s1); index++ {
		counts[index%2][s1[index]-'a']++
	}
	for index := 0; index < len(s2); index++ {
		counts[index%2][s2[index]-'a']--
		if counts[index%2][s2[index]-'a'] < 0 {
			// s2's parity class needs a copy this character s1 cannot supply.
			return false
		}
	}
	return true
}
