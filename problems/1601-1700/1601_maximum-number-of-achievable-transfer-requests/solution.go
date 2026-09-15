import "math/bits"

func maximumRequests(n int, requests [][]int) int {
	m := len(requests)
	best := 0
	for mask := 0; mask < (1 << m); mask++ {
		popcount := bits.OnesCount(uint(mask))
		if popcount <= best {
			continue
		}
		degree := make([]int, n)
		for i := 0; i < m; i++ {
			if mask&(1<<i) != 0 {
				degree[requests[i][0]]--
				degree[requests[i][1]]++
			}
		}
		balanced := true
		for _, d := range degree {
			if d != 0 {
				balanced = false
				break
			}
		}
		if balanced {
			best = popcount
		}
	}
	return best
}
