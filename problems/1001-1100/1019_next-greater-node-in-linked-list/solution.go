func nextLargerNodes(head *ListNode) []int {
	values := []int{}
	for node := head; node != nil; node = node.Next {
		values = append(values, node.Val)
	}
	n := len(values)
	answer := make([]int, n)
	stack := []int{} // indices with values in decreasing order
	for i, value := range values {
		for len(stack) > 0 && values[stack[len(stack)-1]] < value {
			answer[stack[len(stack)-1]] = value
			stack = stack[:len(stack)-1]
		}
		stack = append(stack, i)
	}
	return answer
}
