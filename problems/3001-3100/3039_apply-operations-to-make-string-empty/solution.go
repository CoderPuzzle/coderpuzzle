func lastNonEmptyString(s string) string {
	var counts [26]int
	for index := 0; index < len(s); index++ {
		counts[s[index]-'a']++
	}
	top := 0
	for _, count := range counts {
		if count > top {
			top = count
		}
	}
	var taken [26]bool
	var kept []byte
	for index := len(s) - 1; index >= 0; index-- {
		slot := s[index] - 'a'
		if counts[slot] == top && !taken[slot] {
			taken[slot] = true
			kept = append(kept, s[index])
		}
	}
	for i, j := 0, len(kept)-1; i < j; i, j = i+1, j-1 {
		kept[i], kept[j] = kept[j], kept[i]
	}
	return string(kept)
}
