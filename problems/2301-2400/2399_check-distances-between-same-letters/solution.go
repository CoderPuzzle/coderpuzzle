func checkDistances(s string, distance []int) bool {
	// Remember each letter's first index; on the second sighting the
	// letters strictly between number second - first - 1, which must
	// equal that letter's distance entry.
	var first [26]int
	for i := range first {
		first[i] = -1
	}
	for i := 0; i < len(s); i++ {
		k := s[i] - 'a'
		if first[k] < 0 {
			first[k] = i
		} else if i-first[k]-1 != distance[k] {
			return false
		}
	}
	return true
}
