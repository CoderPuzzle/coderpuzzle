func kthDistinct(arr []string, k int) string {
	frequencies := make(map[string]int, len(arr))
	for _, word := range arr {
		frequencies[word]++
	}
	for _, word := range arr {
		if frequencies[word] == 1 {
			k--
			if k == 0 {
				return word
			}
		}
	}
	return ""
}
