func maxScore(nums []int, x int) int64 {
	unseen := -(int64(1) << 60)
	best := [2]int64{unseen, unseen}
	best[nums[0]%2] = int64(nums[0])

	for _, value := range nums[1:] {
		parity := value % 2
		extended := best[parity] + int64(value)
		switched := best[parity^1] + int64(value) - int64(x)
		if switched > extended {
			extended = switched
		}
		best[parity] = extended
	}
	if best[1] > best[0] {
		return best[1]
	}
	return best[0]
}
