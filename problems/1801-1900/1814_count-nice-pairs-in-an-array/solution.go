// The condition rearranges to nums[i] - rev(nums[i]) being equal on both
// sides, so each key pairs with every earlier equal key; the running total
// stays under C(10^5, 2) ~ 5 * 10^9, so it is accumulated in an int64 and
// reduced once at the end.
func countNicePairs(nums []int) int {
	const mod = 1000000007
	count := make(map[int]int)
	total := int64(0)
	for _, x := range nums {
		y, r := x, 0
		for y > 0 {
			r = r*10 + y%10
			y /= 10
		}
		key := x - r
		seen := count[key]
		total += int64(seen)
		count[key] = seen + 1
	}
	return int(total % mod)
}
