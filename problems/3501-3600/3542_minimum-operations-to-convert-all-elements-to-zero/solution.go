// Monotonic stack of the minima of currently open windows. An element equal
// to the top continues that window's group (same operation), a larger element
// opens a new group (one more operation), and anything smaller — including 0
// — closes every window above it.
func minOperations(nums []int) int {
	ans := 0
	stack := make([]int, 0, len(nums))
	for _, x := range nums {
		for len(stack) > 0 && stack[len(stack)-1] > x {
			stack = stack[:len(stack)-1]
		}
		if x > 0 && (len(stack) == 0 || stack[len(stack)-1] < x) {
			ans++
			stack = append(stack, x)
		}
	}
	return ans
}
