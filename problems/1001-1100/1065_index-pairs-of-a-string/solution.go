import "sort"

func indexPairs(text string, words []string) [][]int {
	result := [][]int{}
	n := len(text)
	for i := 0; i < n; i++ {
		for _, word := range words {
			end := i + len(word)
			if end <= n && text[i:end] == word {
				result = append(result, []int{i, end - 1})
			}
		}
	}
	sort.Slice(result, func(a, b int) bool {
		if result[a][0] != result[b][0] {
			return result[a][0] < result[b][0]
		}
		return result[a][1] < result[b][1]
	})
	return result
}
