func movesToMakeZigzag(nums []int) int {
	cost := func(valleyParity int) int {
		moves := 0
		for i := valleyParity; i < len(nums); i += 2 {
			// Valley must drop below both neighbors; the neighbors are
			// peaks of the other parity and never get decreased.
			bound := 1 << 30
			if i > 0 && nums[i-1] < bound {
				bound = nums[i-1]
			}
			if i+1 < len(nums) && nums[i+1] < bound {
				bound = nums[i+1]
			}
			if nums[i] >= bound {
				moves += nums[i] - bound + 1
			}
		}
		return moves
	}
	if a, b := cost(0), cost(1); a < b {
		return a
	} else {
		return b
	}
}
