// No subarray can beat the whole array: it sees only a subset of the
// elements, so its maximum never exceeds the global maximum and its
// minimum never drops below the global minimum. Repeating the whole array
// as every pick attains that spread k times. The spread reaches 10^9 and
// k reaches 10^5, so the product needs int64 even though every element
// fits in int.
func maxTotalValue(nums []int, k int) int64 {
	lo, hi := nums[0], nums[0]
	for _, x := range nums {
		lo = min(lo, x)
		hi = max(hi, x)
	}
	return (int64(hi) - int64(lo)) * int64(k)
}
