func countPartitions(nums []int) int {
	// left - right = total - 2 * right, and twice any integer is even, so
	// every partition's difference carries the total's parity: either all
	// n - 1 splits are even (total even) or none is (total odd).
	total := 0
	for _, v := range nums {
		total += v
	}
	if total%2 == 0 {
		return len(nums) - 1
	}
	return 0
}
