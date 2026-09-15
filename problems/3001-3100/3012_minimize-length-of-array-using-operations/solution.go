func minimumArrayLength(nums []int) int {
	// A unique minimum absorbs everything (m % y == m for y > m), and a
	// value not divisible by the minimum forges an even smaller unique
	// minimum — both end at length 1. Otherwise every survivor stays a
	// multiple of m, and only merging two copies of m removes one.
	m := nums[0]
	for _, value := range nums {
		if value < m {
			m = value
		}
	}
	count := 0
	indivisible := false
	for _, value := range nums {
		if value == m {
			count++
		}
		if value%m != 0 {
			indivisible = true
		}
	}
	if count == 1 || indivisible {
		return 1
	}
	return (count + 1) / 2
}
