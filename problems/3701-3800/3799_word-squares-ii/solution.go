import (
	"sort"
)

func wordSquares(words []string) [][]string {
	byFirst := make(map[byte][]string)
	byLast := make(map[byte][]string)
	for _, word := range words {
		byFirst[word[0]] = append(byFirst[word[0]], word)
		byLast[word[3]] = append(byLast[word[3]], word)
	}
	sorted := make([]string, len(words))
	copy(sorted, words)
	sort.Strings(sorted)
	res := [][]string{}
	for _, top := range sorted {
		for _, left := range byFirst[top[0]] {
			if left == top {
				continue
			}
			for _, right := range byFirst[top[3]] {
				if right == top || right == left {
					continue
				}
				for _, bottom := range byLast[right[3]] {
					if bottom[0] != left[3] {
						continue
					}
					if bottom == top || bottom == left || bottom == right {
						continue
					}
					res = append(res, []string{top, left, right, bottom})
				}
			}
		}
	}
	sort.Slice(res, func(i, j int) bool {
		for k := 0; k < 4; k++ {
			if res[i][k] != res[j][k] {
				return res[i][k] < res[j][k]
			}
		}
		return false
	})
	return res
}
