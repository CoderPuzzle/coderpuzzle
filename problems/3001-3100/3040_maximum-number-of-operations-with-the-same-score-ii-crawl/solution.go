func maxOperations(nums []int) int {
	// The first operation fixes the score, and its pair is one of three:
	// the two head elements, the two tail elements, or both end elements.
	n := len(nums)
	headPair := nums[0] + nums[1]
	endPair := nums[0] + nums[n-1]
	tailPair := nums[n-2] + nums[n-1]
	best := 0
	for _, target := range []int{headPair, endPair, tailPair} {
		// Every operation deletes exactly two elements, so a window keeps
		// its width parity; roll one dp layer per reachable width.
		previous := make([]int, n+2)
		for width := 2 + n%2; width <= n; width += 2 {
			current := make([]int, n+2)
			for left := 0; left+width <= n; left++ {
				right := left + width - 1
				value := 0
				if nums[left]+nums[right] == target {
					if 1+previous[left+1] > value {
						value = 1 + previous[left+1]
					}
				}
				if nums[left]+nums[left+1] == target {
					if 1+previous[left+2] > value {
						value = 1 + previous[left+2]
					}
				}
				if nums[right-1]+nums[right] == target {
					if 1+previous[left] > value {
						value = 1 + previous[left]
					}
				}
				current[left] = value
			}
			previous, current = current, previous
		}
		if previous[0] > best {
			best = previous[0]
		}
	}
	return best
}
