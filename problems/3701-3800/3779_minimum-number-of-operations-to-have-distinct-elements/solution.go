// Pointer + counts: counts tracks the remaining suffix, duplicated how
// many distinct values it still holds twice or more. While the suffix has
// a duplicate, one operation advances the pointer by three and refreshes
// only those three values (the last, possibly shorter, operation removes
// whatever is left).
func minOperations(nums []int) int {
	counts := make(map[int]int)
	for _, v := range nums {
		counts[v]++
	}
	duplicated := 0
	for _, c := range counts {
		if c >= 2 {
			duplicated++
		}
	}
	i := 0
	ops := 0
	n := len(nums)
	for i < n && duplicated > 0 {
		end := i + 3
		if end > n {
			end = n
		}
		for j := i; j < end; j++ {
			counts[nums[j]]--
			if counts[nums[j]] == 1 {
				duplicated--
			}
		}
		i += 3
		ops++
	}
	return ops
}
