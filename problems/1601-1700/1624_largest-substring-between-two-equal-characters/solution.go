// Only a character's first and last occurrence can bound the widest gap for
// that character, so a single pass recording first-seen indices is enough.
func maxLengthBetweenEqualCharacters(s string) int {
	first := [26]int{}
	for i := range first {
		first[i] = -1
	}
	best := -1
	for index := 0; index < len(s); index++ {
		c := s[index] - 'a'
		if first[c] == -1 {
			first[c] = index
		} else if gap := index - first[c] - 1; gap > best {
			best = gap
		}
	}
	return best
}
