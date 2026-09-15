import "math/bits"

func minimumXORSum(nums1 []int, nums2 []int) int {
	n := len(nums1)
	size := 1 << n
	INF := int64(1) << 62
	dp := make([]int64, size)
	for i := range dp {
		dp[i] = INF
	}
	dp[0] = 0
	for mask := 1; mask < size; mask++ {
		i := bits.OnesCount(uint(mask)) - 1 // index into nums1 for this subset
		x := int64(nums1[i])
		best := INF
		m := mask
		for m != 0 {
			lowbit := m & (-m)
			j := bits.Len(uint(lowbit)) - 1
			cand := dp[mask^lowbit] + (x ^ int64(nums2[j]))
			if cand < best {
				best = cand
			}
			m -= lowbit
		}
		dp[mask] = best
	}
	return int(dp[size-1])
}
