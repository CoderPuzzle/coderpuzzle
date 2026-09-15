import "sort"

func minSubArrayLen(target int, nums []int) int {
	n := len(nums)
	// prefix[i] = sum of the first i elements. Positivity makes it strictly
	// increasing, which licenses the binary search; int64s absorb
	// prefix + target, which can pass 2^31.
	prefix := make([]int64, n+1)
	for i, x := range nums {
		prefix[i+1] = prefix[i] + int64(x)
	}
	// Sentinel: an impossible length that survives when target is never met.
	best := n + 1
	for i := 0; i < n; i++ {
		key := prefix[i] + int64(target)
		// Lower bound: the first prefix >= key, searched from i+1 on so
		// the window has positive length.
		j := i + 1 + sort.Search(n-i, func(k int) bool {
			return prefix[i+1+k] >= key
		})
		if j <= n && j-i < best {
			best = j - i
		}
	}
	if best == n+1 {
		return 0
	}
	return best
}
