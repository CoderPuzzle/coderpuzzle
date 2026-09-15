import "sort"

func countTheNumOfKFreeSubsets(nums []int, k int) int64 {
	sorted := append([]int(nil), nums...)
	sort.Ints(sorted)
	// Two elements conflict only when they differ by exactly k, which chains
	// values into arithmetic sequences: x joins x - k's group when that
	// predecessor exists, else starts a new one. Any conflicting pair lands
	// in the same chain, so groups are independent.
	groupOf := make(map[int]int)
	lengths := []int64{}
	for _, x := range sorted {
		if gid, ok := groupOf[x-k]; ok {
			groupOf[x] = gid
			lengths[gid]++
		} else {
			groupOf[x] = len(lengths)
			lengths = append(lengths, 1)
		}
	}
	// Product over chains; 1 counts the empty subset of the whole array.
	ans := int64(1)
	for _, length := range lengths {
		// A k-free subset of a chain omits chain-adjacent members —
		// independent sets of a path. dp[i] = dp[i-1] + dp[i-2] is a
		// Fibonacci shift; after `length` steps b is the chain's count.
		a, b := int64(1), int64(1)
		for t := int64(0); t < length; t++ {
			a, b = b, a+b
		}
		ans *= b
	}
	return ans
}
