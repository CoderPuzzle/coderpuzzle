import "strconv"

func printTree(root *TreeNode) [][]string {
	// The layout is pinned before any cell is written: rows = height + 1,
	// columns = 2^(height+1) - 1, children stepping 2^(height-r-1) columns
	// sideways of their parent. So a first pass measures the tree's height —
	// in edges, the unit the formulas are stated in — on an explicit stack:
	// the placement formulas consume it, so guessing it wrong would shift
	// every cell in the grid.
	type depthFrame struct {
		node  *TreeNode
		depth int
	}
	height := 0
	measure := []depthFrame{{root, 0}}
	for len(measure) > 0 {
		top := measure[len(measure)-1]
		measure = measure[:len(measure)-1]
		if top.depth > height {
			height = top.depth
		}
		if top.node.Left != nil {
			measure = append(measure, depthFrame{top.node.Left, top.depth + 1})
		}
		if top.node.Right != nil {
			measure = append(measure, depthFrame{top.node.Right, top.depth + 1})
		}
	}
	// Second pass: the grid is born as every cell "" (Go's zero string), the
	// root goes to the exact middle of the top row, and untouched cells
	// simply keep their "" — the empties are the layout: the matrix is as
	// wide as the deepest path alone, not as the node count.
	rows, cols := height+1, (1<<(height+1))-1
	res := make([][]string, rows)
	for i := range res {
		res[i] = make([]string, cols)
	}
	type spot struct {
		node   *TreeNode
		row    int
		column int
	}
	place := []spot{{root, 0, (cols - 1) / 2}}
	for len(place) > 0 {
		top := place[len(place)-1]
		place = place[:len(place)-1]
		res[top.row][top.column] = strconv.Itoa(top.node.Val)
		if top.node.Left != nil || top.node.Right != nil {
			// An internal node always sits above the last row, so the
			// exponent height - row - 1 is never negative.
			offset := 1 << (height - top.row - 1)
			if top.node.Left != nil {
				place = append(place, spot{top.node.Left, top.row + 1, top.column - offset})
			}
			if top.node.Right != nil {
				place = append(place, spot{top.node.Right, top.row + 1, top.column + offset})
			}
		}
	}
	return res
}
