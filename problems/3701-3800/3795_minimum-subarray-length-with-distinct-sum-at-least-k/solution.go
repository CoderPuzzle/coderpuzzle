func minLength(nums []int, k int) int {
	// One pass, right end expanding: freq counts each value inside the
	// window and distinctSum tracks the sum of the distinct values
	// present — a value joins the sum when its first copy enters and
	// leaves it when its last copy departs.
	freq := make(map[int]int)
	distinctSum := 0
	best := -1
	left := 0
	for right, num := range nums {
		freq[num]++
		if freq[num] == 1 {
			distinctSum += num
		}
		// Shrink from the left while the window stays qualified; every
		// prefix of a kept window is dropped only after recording it.
		for distinctSum >= k && left <= right {
			length := right - left + 1
			if best == -1 || length < best {
				best = length
			}
			out := nums[left]
			if freq[out] == 1 {
				distinctSum -= out
			}
			freq[out]--
			left++
		}
	}
	return best
}
