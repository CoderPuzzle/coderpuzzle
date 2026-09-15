import "math/bits"

func maxWeight(n int, edges [][]int, k int, t int) int {
	// Layered bitset DP over path sums: bit s of node v's word array is
	// set iff some path of exactly j edges ends at v with total exactly s
	// (s < t). Weights are >= 1, so a total < t never passes through a
	// prefix >= t, and masking mid-path never drops a valid path.
	words := (t + 63) / 64
	full := make([]uint64, words)
	for i := range full {
		full[i] = ^uint64(0)
	}
	if t%64 != 0 {
		full[words-1] = (uint64(1) << (t % 64)) - 1
	}
	dp := make([]uint64, n*words)
	ndp := make([]uint64, n*words)
	for v := 0; v < n; v++ {
		dp[v*words] = 1 // empty path (sum 0) at every node
	}
	for j := 0; j < k; j++ {
		for i := range ndp {
			ndp[i] = 0
		}
		for _, e := range edges {
			base, to, w := e[0]*words, e[1]*words, e[2]
			for i := words - 1; i >= 0; i-- {
				val := dp[base+i] << w
				if i > 0 {
					val |= dp[base+i-1] >> (64 - w)
				}
				ndp[to+i] |= val & full[i]
			}
		}
		dp, ndp = ndp, dp
	}
	best := -1
	for v := 0; v < n; v++ {
		for i := words - 1; i >= 0; i-- {
			if m := dp[v*words+i]; m != 0 {
				if s := 64*i + 63 - bits.LeadingZeros64(m); s > best {
					best = s
				}
				break
			}
		}
	}
	return best
}
