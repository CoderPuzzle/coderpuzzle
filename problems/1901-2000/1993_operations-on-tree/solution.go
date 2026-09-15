package main

// Owner per node (-1 = unlocked) plus children adjacency built from the
// parent array; upgrade enumerates descendants with an explicit stack so
// a 2000-node chain is never recursed into.
type LockingTree struct {
	parent   []int
	owner    []int
	children [][]int
}

func NewLockingTreeTyped(parent []int) *LockingTree {
	owner := make([]int, len(parent))
	for i := range owner {
		owner[i] = -1
	}
	children := make([][]int, len(parent))
	for node := 1; node < len(parent); node++ {
		children[parent[node]] = append(children[parent[node]], node)
	}
	return &LockingTree{parent: parent, owner: owner, children: children}
}

func (design *LockingTree) lock(num int, user int) bool {
	if design.owner[num] != -1 {
		return false
	}
	design.owner[num] = user
	return true
}

func (design *LockingTree) unlock(num int, user int) bool {
	if design.owner[num] != user {
		return false
	}
	design.owner[num] = -1
	return true
}

func (design *LockingTree) upgrade(num int, user int) bool {
	// Condition 1: the node itself must be unlocked.
	if design.owner[num] != -1 {
		return false
	}
	// Condition 3: no ancestor may be locked.
	for node := design.parent[num]; node != -1; node = design.parent[node] {
		if design.owner[node] != -1 {
			return false
		}
	}
	// Condition 2: at least one locked descendant. Collect every
	// descendant iteratively so the check and the later unlock share one
	// traversal.
	descendants := []int{}
	stack := append([]int{}, design.children[num]...)
	hasLocked := false
	for len(stack) > 0 {
		last := len(stack) - 1
		node := stack[last]
		stack = stack[:last]
		descendants = append(descendants, node)
		if design.owner[node] != -1 {
			hasLocked = true
		}
		stack = append(stack, design.children[node]...)
	}
	if !hasLocked {
		return false
	}
	design.owner[num] = user
	for _, node := range descendants {
		design.owner[node] = -1
	}
	return true
}
