func largestInteger(nums []int, k int) int {
	// One counter per possible value (0..50): how many distinct windows of
	// size k contain it.
	count := make([]int, 51)
	stamp := make([]int, 51)
	for i := range stamp {
		stamp[i] = -1
	}
	for start := 0; start+k <= len(nums); start++ {
		// Dedup inside the window with a stamp: a value repeated within one
		// window still counts once there.
		for _, value := range nums[start : start+k] {
			if stamp[value] != start {
				stamp[value] = start
				count[value]++
			}
		}
	}
	// Scan down from the largest possible value: first hit wins.
	for value := 50; value >= 0; value-- {
		if count[value] == 1 {
			return value
		}
	}
	return -1
}
