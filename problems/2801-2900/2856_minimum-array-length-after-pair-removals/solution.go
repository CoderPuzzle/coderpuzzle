// Each operation removes two elements of DIFFERENT values, so a fixed
// value loses at most one copy per operation and no schedule beats
// n - m operations, where m is the multiplicity of the most frequent
// value (nor n / 2). The bound is reached by repeatedly removing one
// element from the currently largest value group and one from another
// group, so the answer is n - 2 * min(n / 2, n - m), which simplifies
// to max(n % 2, 2 * m - n). nums is sorted, so m is just the longest
// run of equal elements, found in one scan. Every quantity here stays
// far inside signed 32-bit range.
func minLengthAfterRemovals(nums []int) int {
	n := len(nums)
	best := 1
	run := 1
	for i := 1; i < n; i++ {
		if nums[i] == nums[i-1] {
			run++
		} else {
			run = 1
		}
		if run > best {
			best = run
		}
	}
	answer := n % 2
	if two := 2*best - n; two > answer {
		answer = two
	}
	return answer
}
