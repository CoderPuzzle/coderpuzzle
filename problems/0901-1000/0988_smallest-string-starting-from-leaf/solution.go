import "bytes"

// Every root-to-leaf path, read backwards, is one candidate, and the
// answer is the smallest of them — plain lexicographic order, in which a
// strict prefix counts as smaller ("ab" < "aba"). One shared path buffer
// holds a character per active root->node frame: descending appends,
// unwinding pops, so no frame ever carries a copy of its parent's path,
// and the buffer is reversed into a candidate only at a leaf.
// bytes.Compare does the comparing — bytewise, strict prefix smaller —
// and for these ASCII letters byte order is letter order.
// Iterative on purpose: the 8500-node chain the constraints allow nests
// far deeper than the judge's goroutine stacks may recurse; the explicit
// stack is one entry per node or unwind marker and never nests a call.
func smallestFromLeaf(root *TreeNode) string {
	var best []byte // nil doubles as "no candidate yet"
	// The path buffer holds one character per active frame, root -> node.
	path := []byte{}
	// A nil stack entry unwinds the path one character; a node entry
	// descends into it.
	pending := []*TreeNode{root}
	for len(pending) > 0 {
		node := pending[len(pending)-1]
		pending = pending[:len(pending)-1]
		if node == nil {
			path = path[:len(path)-1]
			continue
		}
		path = append(path, 'a'+byte(node.Val))
		if node.Left == nil && node.Right == nil {
			candidate := make([]byte, len(path))
			for i := range candidate {
				candidate[i] = path[len(path)-1-i]
			}
			if best == nil || bytes.Compare(candidate, best) < 0 {
				best = candidate
			}
			path = path[:len(path)-1] // a leaf unwinds its own character
			continue
		}
		pending = append(pending, nil) // unwinds once both subtrees finish
		if node.Right != nil {
			pending = append(pending, node.Right)
		}
		if node.Left != nil {
			pending = append(pending, node.Left)
		}
	}
	return string(best)
}
