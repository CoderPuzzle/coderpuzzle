func maxSubArrayLen(nums []int, k int) int {
	var solve func(lo, hi int) int
	// Longest qualifying subarray inside nums[lo..hi]: recurse on each
	// half, then stitch the halves together.
	solve = func(lo, hi int) int {
		if lo > hi {
			return 0
		}
		if lo == hi {
			if nums[lo] == k {
				return 1
			}
			return 0
		}
		mid := lo + (hi-lo)/2
		best := max(solve(lo, mid), solve(mid+1, hi))
		// A subarray crossing the midline is a suffix of the left half
		// plus a prefix of the right half. Record, per suffix sum, the
		// longest suffix that carries it — scanning away from the mid
		// and overwriting keeps the longest.
		longest := make(map[int]int)
		total := 0
		for i := mid; i >= lo; i-- {
			total += nums[i]
			longest[total] = mid - i + 1
		}
		total = 0
		for j := mid + 1; j <= hi; j++ {
			total += nums[j]
			// The right prefix pins the sum the left suffix must supply.
			if length, ok := longest[k-total]; ok && length+(j-mid) > best {
				best = length + (j - mid)
			}
		}
		return best
	}
	return solve(0, len(nums)-1)
}
