import "math"

// The stack holds the values still open for a left descendant — the current
// left spine, strictly decreasing. low is the closest ancestor already closed
// by a larger value; everything after that close descends to its right, so
// every later value must clear it.
func verifyPreorder(preorder []int) bool {
	stack := []int{}
	low := math.MinInt
	for _, value := range preorder {
		// A value below low would have to sit in a closed ancestor's left
		// subtree, which is already finished.
		if value < low {
			return false
		}
		// A larger value ends the left subtree of every popped ancestor and
		// takes its place to the right; the deepest popped ancestor is the
		// new bound.
		for len(stack) > 0 && stack[len(stack)-1] < value {
			low = stack[len(stack)-1]
			stack = stack[:len(stack)-1]
		}
		stack = append(stack, value)
	}
	return true
}
