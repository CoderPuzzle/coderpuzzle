func copyRandomList(head *RandomListNode) *RandomListNode {
	clones := make(map[*RandomListNode]*RandomListNode)
	var find func(node *RandomListNode) *RandomListNode
	find = func(node *RandomListNode) *RandomListNode {
		if node == nil {
			return nil
		}
		if existing, ok := clones[node]; ok {
			return existing
		}
		clone := &RandomListNode{Val: node.Val}
		clones[node] = clone
		clone.Next = find(node.Next)
		clone.Random = find(node.Random)
		return clone
	}
	return find(head)
}
