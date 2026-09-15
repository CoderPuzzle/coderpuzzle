package main

import "math/rand"

// A skiplist: a stack of sorted singly-linked layers, each skipping over
// roughly half the elements below. add promotes a node to a random level
// (geometric, p = 1/2) and splices it into every layer it occupies;
// search/erase descend from the top layer, always moving to the rightmost
// node whose value stays below the target. The node type is named
// skiplistNode to avoid clashing with the judge-assembled Node type.
type skiplistNode struct {
	val  int
	next []*skiplistNode
}

type Skiplist struct {
	head *skiplistNode
}

const maxLevel = 16

func newSkiplistNode(val int, level int) *skiplistNode {
	return &skiplistNode{val: val, next: make([]*skiplistNode, level)}
}

func NewSkiplistTyped() *Skiplist {
	return &Skiplist{head: newSkiplistNode(-1, maxLevel)}
}

func (design *Skiplist) randomLevel() int {
	level := 1
	for rand.Intn(2) == 0 && level < maxLevel {
		level++
	}
	return level
}

// predecessors returns the rightmost node strictly below target at each layer.
func (design *Skiplist) predecessors(target int) []*skiplistNode {
	update := make([]*skiplistNode, maxLevel)
	cur := design.head
	for i := maxLevel - 1; i >= 0; i-- {
		for cur.next[i] != nil && cur.next[i].val < target {
			cur = cur.next[i]
		}
		update[i] = cur
	}
	return update
}

func (design *Skiplist) search(target int) bool {
	cur := design.head
	for i := maxLevel - 1; i >= 0; i-- {
		for cur.next[i] != nil && cur.next[i].val < target {
			cur = cur.next[i]
		}
	}
	cur = cur.next[0]
	return cur != nil && cur.val == target
}

func (design *Skiplist) add(num int) {
	update := design.predecessors(num)
	node := newSkiplistNode(num, design.randomLevel())
	// Splice into each layer the node actually occupies.
	for i := 0; i < len(node.next); i++ {
		node.next[i] = update[i].next[i]
		update[i].next[i] = node
	}
}

func (design *Skiplist) erase(num int) bool {
	update := design.predecessors(num)
	cur := update[0].next[0]
	if cur == nil || cur.val != num {
		return false
	}
	// Unlink cur only where it is the immediate next node; at higher
	// layers a duplicate with more levels may take over.
	for i := 0; i < maxLevel; i++ {
		if update[i].next[i] == cur {
			update[i].next[i] = cur.next[i]
		}
	}
	return true
}
