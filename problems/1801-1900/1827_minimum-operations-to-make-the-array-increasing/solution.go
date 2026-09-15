// Strict increase forces each element to at least prev + 1, and lifting an
// element any higher only raises the floor of the next one, so the cheapest
// reachable target is exactly that floor.
func minOperations(nums []int) int {
	ops := 0
	prev := nums[0]
	for i := 1; i < len(nums); i++ {
		target := max(prev+1, nums[i])
		ops += target - nums[i]
		prev = target
	}
	return ops
}
