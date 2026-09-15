// Each pair [a, b] is an edge from a richer person to a poorer one, so the
// people definitely at least as rich as x are x plus all its ancestors in
// the DAG. A Kahn sweep settles persons from the known-richest downward:
// once every richer neighbor of b has relaxed its answer into b, answer[b]
// holds the least quiet person among them all.
func loudAndRich(richer [][]int, quiet []int) []int {
	n := len(quiet)
	poorer := make([][]int, n)
	pending := make([]int, n)
	for _, pair := range richer {
		a, b := pair[0], pair[1]
		poorer[a] = append(poorer[a], b)
		pending[b]++
	}
	answer := make([]int, n)
	for x := range answer {
		answer[x] = x
	}
	settled := make([]int, 0, n)
	for x, count := range pending {
		if count == 0 {
			settled = append(settled, x)
		}
	}
	for i := 0; i < len(settled); i++ {
		x := settled[i]
		for _, b := range poorer[x] {
			if quiet[answer[x]] < quiet[answer[b]] {
				answer[b] = answer[x]
			}
			pending[b]--
			if pending[b] == 0 {
				settled = append(settled, b)
			}
		}
	}
	return answer
}
