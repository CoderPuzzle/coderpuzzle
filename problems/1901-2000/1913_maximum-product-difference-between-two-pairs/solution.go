// Every value is positive, so the difference is maximized by the product of
// the two largest values minus the product of the two smallest; one
// streaming pass maintains all four extremes. The extreme product
// 1e4 * 1e4 = 1e8 fits comfortably in an int.
func maxProductDifference(nums []int) int {
	m1, m2 := 0, 0
	s1, s2 := 1000000000, 1000000000
	for _, x := range nums {
		if x > m1 {
			m1, m2 = x, m1
		} else if x > m2 {
			m2 = x
		}
		if x < s1 {
			s1, s2 = x, s1
		} else if x < s2 {
			s2 = x
		}
	}
	return m1*m2 - s1*s2
}
