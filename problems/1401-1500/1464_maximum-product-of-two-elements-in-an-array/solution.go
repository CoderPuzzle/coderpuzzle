func maxProduct(nums []int) int {
	first, second := 0, 0
	for _, value := range nums {
		if value > first {
			second = first
			first = value
		} else if value > second {
			second = value
		}
	}
	return (first - 1) * (second - 1)
}
