import "math/bits"

// Every group has exactly n/k elements and no repeated value, so a group is
// a set of n/k indices whose values are pairwise distinct — and with values
// in 1..n, distinctness is itself a 16-bit check. Precompute every valid
// group once, with cost max - min, bucketed under each index it contains,
// then run a DP over bitmasks of undistributed elements: each state removes
// the group covering its lowest remaining index, which collapses the k!
// orderings of one partition, and a full mask no group ever reaches is the
// -1 case.
func minimumIncompatibility(nums []int, k int) int {
	n := len(nums)
	size := n / k
	total := 1 << n
	type group struct {
		mask int
		cost int
	}
	buckets := make([][]group, n)
	for g := 0; g < total; g++ {
		if bits.OnesCount(uint(g)) != size {
			continue
		}
		seen := 0
		lo, hi := n+1, 0
		valid := true
		for i := 0; i < n; i++ {
			if g>>i&1 == 0 {
				continue
			}
			vbit := 1 << (nums[i] - 1)
			if seen&vbit != 0 {
				valid = false
				break
			}
			seen |= vbit
			lo = min(lo, nums[i])
			hi = max(hi, nums[i])
		}
		if !valid {
			continue
		}
		for i := 0; i < n; i++ {
			if g>>i&1 != 0 {
				buckets[i] = append(buckets[i], group{g, hi - lo})
			}
		}
	}
	const INF = 1_000_000
	dp := make([]int, total)
	dp[0] = 0
	for mask := 1; mask < total; mask++ {
		if bits.OnesCount(uint(mask))%size != 0 {
			dp[mask] = INF
			continue
		}
		best := INF
		for _, g := range buckets[bits.TrailingZeros(uint(mask))] {
			if g.mask&mask == g.mask && dp[mask^g.mask]+g.cost < best {
				best = dp[mask^g.mask] + g.cost
			}
		}
		dp[mask] = best
	}
	if dp[total-1] >= INF {
		return -1
	}
	return dp[total-1]
}
