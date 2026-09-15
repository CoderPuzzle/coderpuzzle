import "sort"

func mostPopularCreator(creators []string, ids []string, views []int) [][]string {
	// One pass keeps three running values per creator: total views,
	// best single-video view count, and the id achieving it
	// (lexicographically smallest on a tie). Totals reach
	// 10^5 * 10^5 = 10^10, so sums are int64.
	totals := make(map[string]int64)
	bestView := make(map[string]int)
	bestID := make(map[string]string)
	for i, creator := range creators {
		totals[creator] += int64(views[i])
		current, seen := bestView[creator]
		if !seen || views[i] > current || (views[i] == current && ids[i] < bestID[creator]) {
			bestView[creator] = views[i]
			bestID[creator] = ids[i]
		}
	}
	top := int64(0)
	for _, total := range totals {
		if total > top {
			top = total
		}
	}
	answer := [][]string{}
	for creator, total := range totals {
		if total == top {
			answer = append(answer, []string{creator, bestID[creator]})
		}
	}
	sort.Slice(answer, func(i, j int) bool {
		return answer[i][0] < answer[j][0]
	})
	return answer
}
