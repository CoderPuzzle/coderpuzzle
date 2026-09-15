func nextGreaterElement(nums1 []int, nums2 []int) []int {
	// One scan of nums2 answers every query: the stack holds values still
	// waiting for their next greater element.
	nextGreater := make(map[int]int, len(nums2))
	stack := make([]int, 0, len(nums2))
	for _, value := range nums2 {
		// The current value is the FIRST greater value to the right of
		// each popped element (anything closer would have popped them
		// already); each element is pushed once, popped at most once.
		for len(stack) > 0 && stack[len(stack)-1] < value {
			nextGreater[stack[len(stack)-1]] = value
			stack = stack[:len(stack)-1]
		}
		stack = append(stack, value)
	}
	// Whatever survives on the stack has nothing greater to its right.
	for _, value := range stack {
		nextGreater[value] = -1
	}
	// Values are unique and nums1 is a subset of nums2, so every lookup
	// hits.
	result := make([]int, len(nums1))
	for i, value := range nums1 {
		result[i] = nextGreater[value]
	}
	return result
}
