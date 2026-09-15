import "math/bits"

func maxProfit(n int, edges [][]int, score []int) int {
	pred := make([]int, n)
	for _, e := range edges {
		pred[e[1]] |= 1 << e[0]
	}

	full := (1 << n) - 1
	dp := make([]int, 1<<n)
	for i := range dp {
		dp[i] = -1
	}
	dp[0] = 0

	for mask := 0; mask <= full; mask++ {
		cur := dp[mask]
		if cur < 0 {
			continue
		}
		pos := bits.OnesCount(uint(mask)) + 1
		remaining := full ^ mask
		for remaining != 0 {
			bit := remaining & (-remaining)
			node := bits.TrailingZeros(uint(bit))
			if pred[node]&mask == pred[node] {
				nm := mask | bit
				val := cur + score[node]*pos
				if val > dp[nm] {
					dp[nm] = val
				}
			}
			remaining -= bit
		}
	}
	return dp[full]
}
