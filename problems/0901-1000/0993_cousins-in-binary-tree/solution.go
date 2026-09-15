// Cousinhood is a fact about two coordinates, not about either node alone:
// the depth a node sits at and the parent it hangs from. One descent — an
// explicit stack whose frames are (node, depth, parent value) — records
// both coordinates for the nodes valued x and y, and stops the moment the
// second of them is met. The verdict then reads straight off the records:
// same depth, different parents. The root rides with the sentinel parent 0,
// harmless because no node value is 0 and the root is alone at depth 0.
func isCousins(root *TreeNode, x int, y int) bool {
	depthX, depthY := -1, -1
	parentX, parentY := 0, 0
	type frame struct {
		node   *TreeNode
		depth  int
		parent int
	}
	pending := []frame{{node: root, depth: 0, parent: 0}}
	for len(pending) > 0 {
		f := pending[len(pending)-1]
		pending = pending[:len(pending)-1]
		if f.node == nil {
			continue
		}
		if f.node.Val == x {
			depthX, parentX = f.depth, f.parent
		} else if f.node.Val == y {
			depthY, parentY = f.depth, f.parent
		}
		if depthX >= 0 && depthY >= 0 {
			break
		}
		if f.node.Right != nil {
			pending = append(pending, frame{node: f.node.Right, depth: f.depth + 1, parent: f.node.Val})
		}
		if f.node.Left != nil {
			pending = append(pending, frame{node: f.node.Left, depth: f.depth + 1, parent: f.node.Val})
		}
	}
	return depthX == depthY && parentX != parentY
}
