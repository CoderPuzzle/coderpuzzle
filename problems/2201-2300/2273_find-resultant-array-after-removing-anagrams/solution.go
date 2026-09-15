import "sort"

func removeAnagrams(words []string) []string {
	result := make([]string, 0, len(words))
	prev := ""
	for _, word := range words {
		letters := []byte(word)
		sort.Slice(letters, func(i, j int) bool { return letters[i] < letters[j] })
		signature := string(letters)
		if signature != prev {
			result = append(result, word)
			prev = signature
		}
	}
	return result
}
