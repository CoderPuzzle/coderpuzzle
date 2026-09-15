// dp[x] holds the fewest changes among the residue classes handled so far
// when the chosen class values XOR to x; values are below 2^10, so 1024
// states cover every reachable XOR.
func minChanges(nums []int, k int) int {
	const x = 1024
	const inf = 1 << 20
	dp := make([]int, x)
	for i := range dp {
		dp[i] = inf
	}
	dp[0] = 0
	for r := 0; r < k; r++ {
		count := make([]int, x)
		size := 0
		for i := r; i < len(nums); i += k {
			count[nums[i]]++
			size++
		}
		// Rewriting a whole class costs its full size and leaves its value
		// free, so every state is reachable at best; keeping a value that
		// already occurs can only improve on that.
		best := inf
		for _, d := range dp {
			if d < best {
				best = d
			}
		}
		best += size
		nxt := make([]int, x)
		for i := range nxt {
			nxt[i] = best
		}
		for v, c := range count {
			if c == 0 {
				continue
			}
			cost := size - c
			for u := 0; u < x; u++ {
				w := u ^ v
				t := dp[u] + cost
				if t < nxt[w] {
					nxt[w] = t
				}
			}
		}
		dp = nxt
	}
	return dp[0]
}
