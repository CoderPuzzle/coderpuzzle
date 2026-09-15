// Every value sits below 2^maximumBit, so the running XOR does too, and
// XOR with a fixed prefix is a bijection on that range: the maximum of
// prefix ^ k is reached exactly at k = mask ^ prefix, where mask =
// 2^maximumBit - 1. Removing the last element just XORs it back out of
// the running total, so one backward walk answers every prefix without
// recomputing anything.
func getMaximumXor(nums []int, maximumBit int) []int {
	mask := (1 << maximumBit) - 1
	running := 0
	for _, value := range nums {
		running ^= value
	}
	answer := make([]int, len(nums))
	j := 0
	for i := len(nums) - 1; i >= 0; i-- {
		answer[j] = running ^ mask
		j++
		running ^= nums[i]
	}
	return answer
}
