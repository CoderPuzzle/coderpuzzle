func numberOfSubstrings(s string) int64 {
	counts := [26]int64{}
	var total int64
	for index := 0; index < len(s); index++ {
		character := s[index] - 'a'
		counts[character]++
		total += counts[character]
	}
	return total
}
