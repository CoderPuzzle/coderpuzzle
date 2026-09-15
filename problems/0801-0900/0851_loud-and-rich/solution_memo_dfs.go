// Each pair [a, b] is an edge from a richer person to a poorer one, so the
// people definitely at least as rich as x are x plus all its ancestors in
// the DAG. A memoized DFS settles persons from the known-poorest upward:
// once every direct richer neighbor of x has settled, answer[x] folds in
// their answers, each of which already covers that neighbor's whole chain.
func loudAndRich(richer [][]int, quiet []int) []int {
	n := len(quiet)
	richerOf := make([][]int, n)
	for _, pair := range richer {
		a, b := pair[0], pair[1]
		richerOf[b] = append(richerOf[b], a)
	}
	answer := make([]int, n)
	for x := range answer {
		answer[x] = x
	}
	settled := make([]bool, n)
	type frame struct {
		node int
		next int
	}
	stack := make([]frame, 0, n)
	for start := range answer {
		if settled[start] {
			continue
		}
		stack = stack[:0]
		stack = append(stack, frame{start, 0})
		for len(stack) > 0 {
			x := stack[len(stack)-1].node
			i := stack[len(stack)-1].next
			if i < len(richerOf[x]) {
				stack[len(stack)-1].next = i + 1
				a := richerOf[x][i]
				if !settled[a] {
					stack = append(stack, frame{a, 0})
				}
			} else {
				stack = stack[:len(stack)-1]
				for _, a := range richerOf[x] {
					if quiet[answer[a]] < quiet[answer[x]] {
						answer[x] = answer[a]
					}
				}
				settled[x] = true
			}
		}
	}
	return answer
}
