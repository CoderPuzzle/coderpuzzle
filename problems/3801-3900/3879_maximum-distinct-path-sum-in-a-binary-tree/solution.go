// Parent pointers let the DFS move up as well as down. Trying every node as a
// path start, the search only enters a neighbor whose value is not already on
// the current path — the seen set alone blocks the way back to the parent,
// since the parent is always on the path. Iterative with enter/exit markers,
// so a 1000-node chain cannot blow the call stack.
func maxSum(root *TreeNode) int {
	parent := map[*TreeNode]*TreeNode{}
	parent[root] = nil
	nodes := []*TreeNode{}
	pending := []*TreeNode{root}
	for len(pending) > 0 {
		node := pending[len(pending)-1]
		pending = pending[:len(pending)-1]
		nodes = append(nodes, node)
		if node.Left != nil {
			parent[node.Left] = node
			pending = append(pending, node.Left)
		}
		if node.Right != nil {
			parent[node.Right] = node
			pending = append(pending, node.Right)
		}
	}
	type frame struct {
		node  *TreeNode
		sum   int
		phase int
	}
	best := -1000000000
	for _, start := range nodes {
		seen := map[int]bool{}
		st := []frame{{start, start.Val, 0}}
		for len(st) > 0 {
			f := st[len(st)-1]
			st = st[:len(st)-1]
			if f.phase == 1 {
				delete(seen, f.node.Val)
				continue
			}
			seen[f.node.Val] = true
			if f.sum > best {
				best = f.sum
			}
			st = append(st, frame{f.node, f.sum, 1})
			neighbors := []*TreeNode{f.node.Left, f.node.Right, parent[f.node]}
			for _, next := range neighbors {
				if next != nil && !seen[next.Val] {
					st = append(st, frame{next, f.sum + next.Val, 0})
				}
			}
		}
	}
	return best
}
