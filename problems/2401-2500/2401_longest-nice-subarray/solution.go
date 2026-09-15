func longestNiceSubarray(nums []int) int {
	// a lone element is always nice: best starts at 1, mask starts empty
	best := 1
	left := 0
	windowOr := 0
	// nice <=> no two members share a bit <=> the window's OR mask is
	// disjoint from the incoming value: one AND test per step
	for right := 0; right < len(nums); right++ {
		value := nums[right]
		// conflict: drop from the left; XOR undoes the earlier | because
		// disjointness guarantees the element's bits are private to it
		for windowOr&value != 0 {
			windowOr ^= nums[left]
			left++
		}
		windowOr |= value
		if right-left+1 > best {
			best = right - left + 1
		}
	}
	return best
}
