// Splits target into k full copies plus a remainder: any n consecutive
// elements of the infinite array sum to total, so a remainder hit is a
// window of length < n with sum rem, and one doubled copy contains every
// such window for every start phase. Prefix sums reach
// 2 * sum(nums) = 2 * 10^10, past int32 range, so they widen to int64; the
// answer itself stays below k*n + 2n <= target + 2*10^5 < 2^31.
func minSizeSubarray(nums []int, target int) int {
	var total int64
	for _, v := range nums {
		total += int64(v)
	}
	n := len(nums)
	k := int64(target) / total
	rem := int64(target) % total
	if rem == 0 {
		return int(k) * n
	}
	first := map[int64]int{0: -1}
	var pre int64
	best := -1
	for i := 0; i < 2*n; i++ {
		pre += int64(nums[i%n])
		if j, ok := first[pre-rem]; ok && (best < 0 || i-j < best) {
			best = i - j
		}
		if _, ok := first[pre]; !ok {
			first[pre] = i
		}
	}
	if best < 0 {
		return -1
	}
	return int(k)*n + best
}
