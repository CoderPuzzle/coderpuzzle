func countWords(words1 []string, words2 []string) int {
	first := make(map[string]int)
	second := make(map[string]int)
	for _, word := range words1 {
		first[word]++
	}
	for _, word := range words2 {
		second[word]++
	}
	answer := 0
	for word, frequency := range first {
		if frequency == 1 && second[word] == 1 {
			answer++
		}
	}
	return answer
}
