func secondGreaterElement(nums []int) []int {
	n := len(nums)
	result := make([]int, n)
	for i := range result {
		result[i] = -1
	}
	first := make([]int, 0, n)  // indices awaiting their first greater value
	second := make([]int, 0, n) // indices awaiting their second greater value
	batch := make([]int, 0, n)
	for i := 0; i < n; i++ {
		x := nums[i]
		for len(second) > 0 && nums[second[len(second)-1]] < x {
			result[second[len(second)-1]] = x
			second = second[:len(second)-1]
		}
		batch = batch[:0]
		for len(first) > 0 && nums[first[len(first)-1]] < x {
			batch = append(batch, first[len(first)-1])
			first = first[:len(first)-1]
		}
		// batch leaves the first stack in increasing value order; push it
		// back-to-front so the second stack keeps its smallest value on top
		for j := len(batch) - 1; j >= 0; j-- {
			second = append(second, batch[j])
		}
		first = append(first, i)
	}
	return result
}
