import "sort"

// A pending (node, row, column) step of the depth-first walk.
type frame struct {
	node *TreeNode
	row  int
	col  int
}

func verticalTraversal(root *TreeNode) [][]int {
	// One (column, row, value) record per node, gathered by an
	// explicit-stack DFS — no recursion, so a 1000-node chain cannot
	// exhaust any call stack.
	cells := make(map[int][][2]int)
	pending := []frame{{root, 0, 0}}
	for len(pending) > 0 {
		top := pending[len(pending)-1]
		pending = pending[:len(pending)-1]
		node := top.node
		if node == nil {
			continue
		}
		cells[top.col] = append(cells[top.col], [2]int{top.row, node.Val})
		pending = append(pending, frame{node.Right, top.row + 1, top.col + 1})
		pending = append(pending, frame{node.Left, top.row + 1, top.col - 1})
	}
	columns := make([]int, 0, len(cells))
	for col := range cells {
		columns = append(columns, col)
	}
	sort.Ints(columns)
	// Rows read top to bottom and values break the ties of nodes sharing
	// one cell; the sorted column keys run left to right.
	answer := make([][]int, 0, len(columns))
	for _, col := range columns {
		records := cells[col]
		sort.Slice(records, func(i, j int) bool {
			if records[i][0] != records[j][0] {
				return records[i][0] < records[j][0]
			}
			return records[i][1] < records[j][1]
		})
		values := make([]int, len(records))
		for i, record := range records {
			values[i] = record[1]
		}
		answer = append(answer, values)
	}
	return answer
}
