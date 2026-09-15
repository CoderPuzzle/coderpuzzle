// Inverting `order` gives pos[v], and the BST built by inserting in
// that order is exactly the min-Cartesian tree of pos[1..n]: the root
// is the first-inserted value and every subtree spans a contiguous
// range of values. A monotonic stack over values 1..n (pos increasing
// bottom to top) then recovers every parent in O(n) — popping for v,
// the last value popped re-hangs as v's left child, since it is the
// later-inserted of the two value-neighbours v lands between, while a
// value popped earlier keeps the stack-below parent it was given when
// pushed. Depths fill in insertion order afterwards — a parent is
// always inserted before its children — so two flat sweeps, no
// recursion, cope with the 10^5-deep chains the constraints allow.
func maxDepthBST(order []int) int {
	n := len(order)
	pos := make([]int, n+1)
	for i, v := range order {
		pos[v] = i
	}
	parent := make([]int, n+1)
	stack := make([]int, 0, n)
	for v := 1; v <= n; v++ {
		last := 0
		for len(stack) > 0 && pos[stack[len(stack)-1]] > pos[v] {
			last = stack[len(stack)-1]
			stack = stack[:len(stack)-1]
		}
		if last > 0 {
			parent[last] = v
		}
		if len(stack) > 0 {
			parent[v] = stack[len(stack)-1]
		}
		stack = append(stack, v)
	}
	depth := make([]int, n+1)
	best := 0
	for _, v := range order {
		if parent[v] > 0 {
			depth[v] = depth[parent[v]] + 1
		} else {
			depth[v] = 1
		}
		best = max(best, depth[v])
	}
	return best
}
