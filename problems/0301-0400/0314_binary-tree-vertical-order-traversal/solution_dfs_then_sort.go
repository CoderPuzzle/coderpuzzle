import "sort"

func verticalOrder(root *TreeNode) [][]int {
	// Pure collector: a root-first DFS (left before right) appends one
	// (column, row, value) record per node and defers all ordering to a
	// single sort afterwards.
	triples := [][3]int{}
	var walk func(node *TreeNode, row, col int)
	walk = func(node *TreeNode, row, col int) {
		if node == nil {
			return
		}
		triples = append(triples, [3]int{col, row, node.Val})
		walk(node.Left, row+1, col-1)
		walk(node.Right, row+1, col+1)
	}
	walk(root, 0, 0)
	// SliceStable is the load-bearing choice: the key stops at (column,
	// row), so within one cell the records keep their walk order, and a
	// left-before-right walk visits same-depth nodes exactly in the
	// statement's left-to-right reading order — the value must not take
	// part.
	sort.SliceStable(triples, func(i, j int) bool {
		if triples[i][0] != triples[j][0] {
			return triples[i][0] < triples[j][0]
		}
		return triples[i][1] < triples[j][1]
	})
	answer := [][]int{}
	for i, triple := range triples {
		if i == 0 || triple[0] != triples[i-1][0] {
			answer = append(answer, []int{})
		}
		answer[len(answer)-1] = append(answer[len(answer)-1], triple[2])
	}
	return answer
}
