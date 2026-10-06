package main

// NestedInteger holds an integer or a list of NestedInteger (never both);
// the API mirrors LeetCode's Go template.
type NestedInteger struct {
	integer  *int
	children []*NestedInteger
}

func (n NestedInteger) IsInteger() bool { return n.integer != nil }

func (n NestedInteger) GetInteger() int { return *n.integer }

func (n NestedInteger) GetList() []*NestedInteger { return n.children }

func (n *NestedInteger) SetInteger(value int) {
	held := value
	n.integer = &held
	n.children = nil
}

func (n *NestedInteger) Add(elem NestedInteger) {
	n.integer = nil
	n.children = append(n.children, &elem)
}
