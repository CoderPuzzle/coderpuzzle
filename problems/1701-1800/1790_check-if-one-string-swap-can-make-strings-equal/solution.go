// One swap repairs exactly two positions, and only when their characters
// are crossed between the two strings.
func areAlmostEqual(s1 string, s2 string) bool {
	i, j := -1, -1
	for k := 0; k < len(s1); k++ {
		if s1[k] != s2[k] {
			if i == -1 {
				i = k
			} else if j == -1 {
				j = k
			} else {
				return false
			}
		}
	}
	if j == -1 {
		return i == -1
	}
	return s1[i] == s2[j] && s1[j] == s2[i]
}
