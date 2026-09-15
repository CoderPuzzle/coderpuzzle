import "math/bits"

func assignBikes(workers [][]int, bikes [][]int) int {
	n := len(workers)
	m := len(bikes)
	dist := make([][]int, n)
	for i, w := range workers {
		dist[i] = make([]int, m)
		for b, bk := range bikes {
			absX := w[0] - bk[0]
			if absX < 0 {
				absX = -absX
			}
			absY := w[1] - bk[1]
			if absY < 0 {
				absY = -absY
			}
			dist[i][b] = absX + absY
		}
	}
	size := 1 << m
	inf := int(^uint(0) >> 1)
	dp := make([]int, size)
	for i := range dp {
		dp[i] = inf
	}
	dp[0] = 0
	best := inf
	for mask := 0; mask < size; mask++ {
		if dp[mask] == inf {
			continue
		}
		assigned := bits.OnesCount(uint(mask))
		if assigned == n {
			if dp[mask] < best {
				best = dp[mask]
			}
			continue
		}
		for b := 0; b < m; b++ {
			if mask>>b&1 == 0 {
				candidate := dp[mask] + dist[assigned][b]
				next := mask | (1 << b)
				if candidate < dp[next] {
					dp[next] = candidate
				}
			}
		}
	}
	return best
}
