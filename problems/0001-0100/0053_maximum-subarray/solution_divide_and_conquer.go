// Each range answers four questions at once: total sum, best prefix, best
// suffix, and best interior subarray. Merging two halves glues them together,
// so one recursion describes the whole array.
type stats struct {
	total  int64
	prefix int64
	suffix int64
	best   int64
}

func solve(nums []int, lo, hi int) stats {
	// A single element is its own total, prefix, suffix, and best.
	if hi-lo == 1 {
		x := int64(nums[lo])
		return stats{x, x, x, x}
	}
	mid := (lo + hi) / 2
	l := solve(nums, lo, mid)
	r := solve(nums, mid, hi)
	// The best subarray either stays in one half or is the seam of the left
	// half's best suffix and the right half's best prefix.
	total := l.total + r.total
	prefix := l.prefix
	if l.total+r.prefix > prefix {
		prefix = l.total + r.prefix
	}
	suffix := r.suffix
	if r.total+l.suffix > suffix {
		suffix = r.total + l.suffix
	}
	best := max(l.best, r.best, l.suffix+r.prefix)
	return stats{total, prefix, suffix, best}
}

func maxSubArray(nums []int) int {
	return int(solve(nums, 0, len(nums)).best)
}
