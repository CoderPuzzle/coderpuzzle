// The curse forces each start's journey: magician i jumps to i + k,
// then i + 2k, and so on until the line ends. So dp[i], the total
// gained when starting at i, obeys dp[i] = energy[i] + dp[i + k]: one
// backward pass fills every chain as a running suffix sum, and the
// answer is the largest entry. Every journey holds at most n cells of
// magnitude up to 1000, so |dp[i]| <= 10⁵ * 10³ = 10⁸, which already
// fits in an int — the int64 accumulator simply matches the declared
// return.
func maximumEnergy(energy []int, k int) int64 {
	n := len(energy)
	dp := make([]int64, n)
	dp[n-1] = int64(energy[n-1])
	best := dp[n-1]
	for i := n - 2; i >= 0; i-- {
		var nxt int64
		if i+k < n {
			nxt = dp[i+k]
		}
		dp[i] = int64(energy[i]) + nxt
		if dp[i] > best {
			best = dp[i]
		}
	}
	return best
}
