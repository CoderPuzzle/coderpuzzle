import "sort"

// A pending (node, row, column) step of the depth-first walk.
type frame struct {
	node *TreeNode
	row  int
	col  int
}

func verticalTraversal(root *TreeNode) [][]int {
	// Pure collector: a root-first DFS (left before right, explicit stack,
	// no recursion) appends one (column, row, value) record per node and
	// keeps no answer structure at all.
	triples := [][3]int{}
	pending := []frame{{root, 0, 0}}
	for len(pending) > 0 {
		top := pending[len(pending)-1]
		pending = pending[:len(pending)-1]
		node := top.node
		if node == nil {
			continue
		}
		triples = append(triples, [3]int{top.col, top.row, node.Val})
		pending = append(pending, frame{node.Right, top.row + 1, top.col + 1})
		pending = append(pending, frame{node.Left, top.row + 1, top.col - 1})
	}
	// One sort settles every ordering at once: columns left to right, rows
	// top to bottom, and values breaking the ties of nodes that share one
	// cell. The answer is then just runs of equal columns.
	sort.Slice(triples, func(i, j int) bool {
		if triples[i][0] != triples[j][0] {
			return triples[i][0] < triples[j][0]
		}
		if triples[i][1] != triples[j][1] {
			return triples[i][1] < triples[j][1]
		}
		return triples[i][2] < triples[j][2]
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
