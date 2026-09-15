// f(x) = ax^2 + bx + c is a parabola, so its extreme transformed values
// sit at the two ends of the sorted nums, not in the middle. When a >= 0
// the curve opens upward (a == 0 leaves a monotone line, where the same
// discipline still holds): the largest values wait at the ends, so the
// result fills from the back, each step consuming the larger of
// f(nums[lo]) and f(nums[hi]). When a < 0 the parabola is inverted, the
// smallest values sit at the ends, and the fill runs from the front taking
// the smaller. |f(x)| <= 100*100^2 + 100*100 + 100 = 1,010,100, well
// inside the int range.
func sortTransformedArray(nums []int, a int, b int, c int) []int {
	f := func(x int) int { return (a*x+b)*x + c }
	result := make([]int, len(nums))
	lo, hi := 0, len(nums)-1
	index, step := 0, 1
	if a >= 0 {
		index, step = len(nums)-1, -1
	}
	for lo <= hi {
		left, right := f(nums[lo]), f(nums[hi])
		takeLeft := left >= right
		if a < 0 {
			takeLeft = left <= right
		}
		if takeLeft {
			result[index] = left
			lo++
		} else {
			result[index] = right
			hi--
		}
		index += step
	}
	return result
}
