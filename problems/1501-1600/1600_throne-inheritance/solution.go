package main

// An n-ary tree keyed by name: children maps a name to its kids in birth
// order, and dead holds everyone marked deceased. king is remembered as
// the traversal root.
type ThroneInheritance struct {
	king     string
	children map[string][]string
	dead     map[string]bool
}

func NewThroneInheritanceTyped(kingName string) *ThroneInheritance {
	design := &ThroneInheritance{
		king:     kingName,
		children: map[string][]string{kingName: {}},
		dead:     map[string]bool{},
	}
	return design
}

func (design *ThroneInheritance) birth(parentName string, childName string) {
	design.children[parentName] = append(design.children[parentName], childName)
	design.children[childName] = []string{}
}

func (design *ThroneInheritance) death(name string) {
	design.dead[name] = true
}

func (design *ThroneInheritance) getInheritanceOrder() []string {
	// Iterative pre-order DFS (explicit stack, so depth never risks the
	// call stack — the tree can chain up to 1e5 generations deep).
	// Children go on the stack in reverse so the oldest child is popped,
	// and therefore visited, first.
	order := []string{}
	stack := []string{design.king}
	for len(stack) > 0 {
		last := len(stack) - 1
		name := stack[last]
		stack = stack[:last]
		if !design.dead[name] {
			order = append(order, name)
		}
		kids := design.children[name]
		for i := len(kids) - 1; i >= 0; i-- {
			stack = append(stack, kids[i])
		}
	}
	return order
}
