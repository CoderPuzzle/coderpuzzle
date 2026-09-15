func minUnlockedIndices(nums []int, locked []int) int {
	// A swap only exchanges values differing by exactly 1, so a 1 and a 3
	// can never trade places: any 3 sitting before a 1 dooms the array.
	// Otherwise 1s only ever move left and 3s only ever move right, and
	// every swap they need lands on a boundary between the first 2 and the
	// last 1, or between the first 3 and the last 2.
	n := len(nums)
	first2, first3 := n, n
	last1, last2 := -1, -1
	for i, v := range nums {
		switch v {
		case 1:
			last1 = i
		case 2:
			if i < first2 {
				first2 = i
			}
			last2 = i
		default:
			if i < first3 {
				first3 = i
			}
		}
	}
	if first3 < last1 {
		return -1
	}
	total := 0
	for i, lock := range locked {
		if lock == 1 && (first2 <= i && i < last1 || first3 <= i && i < last2) {
			total++
		}
	}
	return total
}
