// Two indexes walk inward from both ends and swap each pair they form:
// position i trades places with position n-1-i, so every element crosses
// the middle exactly once and the array is reversed when the indexes meet.
// The swap only trades the two slice elements — no string is ever rebuilt —
// so the reversal happens in place with O(1) extra memory; the mutated
// array is the answer.
func reverseString(s []string) []string {
	lo, hi := 0, len(s)-1
	for lo < hi {
		s[lo], s[hi] = s[hi], s[lo]
		lo++
		hi--
	}
	return s
}
