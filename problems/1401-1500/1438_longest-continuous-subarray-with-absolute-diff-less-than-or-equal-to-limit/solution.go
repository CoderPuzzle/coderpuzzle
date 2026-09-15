func longestSubarray(nums []int, limit int) int {
	n := len(nums)
	maxq := make([]int, n)
	minq := make([]int, n)
	mh, mt, sh, st := 0, 0, 0, 0
	left, best := 0, 0
	for right := 0; right < n; right++ {
		x := nums[right]
		for mt > mh && nums[maxq[mt-1]] <= x {
			mt--
		}
		maxq[mt] = right
		mt++
		for st > sh && nums[minq[st-1]] >= x {
			st--
		}
		minq[st] = right
		st++
		for nums[maxq[mh]]-nums[minq[sh]] > limit {
			if maxq[mh] == left {
				mh++
			}
			if minq[sh] == left {
				sh++
			}
			left++
		}
		if right-left+1 > best {
			best = right - left + 1
		}
	}
	return best
}
