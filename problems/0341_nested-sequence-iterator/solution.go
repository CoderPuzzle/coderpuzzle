/*
 * This is the interface that allows for creating nested lists.
 * NestedInteger holds an integer or a list of NestedInteger (never both);
 * the API mirrors LeetCode's Go template.
 * type NestedInteger struct { ... }
 * func (n NestedInteger) IsInteger() bool
 * func (n NestedInteger) GetInteger() int
 * func (n NestedInteger) GetList() []*NestedInteger
 * func (n *NestedInteger) SetInteger(value int)
 * func (n *NestedInteger) Add(elem NestedInteger)
 */

type NestedSequenceIterator struct {
	values []int
	cursor int
}

func NewNestedSequenceIteratorTyped(nestedList NestedInteger) *NestedSequenceIterator {
	iterator := &NestedSequenceIterator{}
	var walk func(value *NestedInteger)
	walk = func(value *NestedInteger) {
		if value.IsInteger() {
			iterator.values = append(iterator.values, value.GetInteger())
			return
		}
		for _, child := range value.GetList() {
			walk(child)
		}
	}
	for _, item := range nestedList.GetList() {
		walk(item)
	}
	return iterator
}

func (design *NestedSequenceIterator) nextValue() int {
	value := design.values[design.cursor]
	design.cursor++
	return value
}

func (design *NestedSequenceIterator) hasMore() bool {
	return design.cursor < len(design.values)
}
