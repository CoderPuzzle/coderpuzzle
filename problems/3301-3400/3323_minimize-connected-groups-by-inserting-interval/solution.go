import "sort"

// Only the merged components matter: sort the intervals, merge the
// overlapping ones, and the answer is the component count minus the largest
// number of consecutive components one new interval can straddle. A new
// interval of length at most k joins components l through r exactly when
// their end-to-end span, c_r.start - c_l.end, is at most k (the interval
// must reach across every component in between, not just the empty gaps).
// Both endpoint bounds move monotonically, so two pointers find the widest
// valid window: advance the right end and shrink from the left while the
// span exceeds k. All coordinates fit in int, so every span does too (the
// span is at most 10^9).
func minConnectedGroups(intervals [][]int, k int) int {
	sort.Slice(intervals, func(i, j int) bool {
		return intervals[i][0] < intervals[j][0]
	})
	merged := make([][]int, 0, len(intervals))
	for _, interval := range intervals {
		if n := len(merged); n > 0 && interval[0] <= merged[n-1][1] {
			if interval[1] > merged[n-1][1] {
				merged[n-1][1] = interval[1]
			}
		} else {
			merged = append(merged, interval)
		}
	}
	best := 0
	left := 0
	for right := 0; right < len(merged); right++ {
		for merged[right][0]-merged[left][1] > k {
			left++
		}
		if right-left > best {
			best = right - left
		}
	}
	return len(merged) - best
}
