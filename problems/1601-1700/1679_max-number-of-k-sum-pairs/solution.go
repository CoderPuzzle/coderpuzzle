// An operation always consumes one x and one k - x, so the answer depends
// only on how often each value occurs. For x below its complement the pair
// count is capped by the scarcer side, giving min(count(x), count(k - x));
// when k is even, x = k / 2 is its own complement and pairs with itself
// count(x) / 2 times. Comparing x with k - x directly, never summing two
// values, keeps every intermediate inside 32 bits.
func maxOperations(nums []int, k int) int {
	count := map[int]int{}
	for _, value := range nums {
		count[value]++
	}
	ops := 0
	for x, c := range count {
		complement := k - x
		if x < complement {
			ops += min(c, count[complement])
		} else if x == complement {
			ops += c / 2
		}
	}
	return ops
}
