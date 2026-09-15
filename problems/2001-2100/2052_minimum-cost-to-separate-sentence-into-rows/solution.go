import "strings"

func minimumCost(sentence string, k int) int {
	words := strings.Split(sentence, " ")
	count := len(words)
	dp := make([]int64, count+1)

	for start := count - 1; start >= 0; start-- {
		best := int64(^uint64(0) >> 1)
		rowLength := 0
		for end := start; end < count; end++ {
			rowLength += len(words[end])
			if end > start {
				rowLength++
			}
			if rowLength > k {
				break
			}
			var candidate int64
			if end != count-1 {
				unused := int64(k - rowLength)
				candidate = unused*unused + dp[end+1]
			}
			if candidate < best {
				best = candidate
			}
		}
		dp[start] = best
	}
	return int(dp[0])
}
