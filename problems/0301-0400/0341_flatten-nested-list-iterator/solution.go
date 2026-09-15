type NestedIterator struct {
	values []int
	cursor int
}

func NewNestedIteratorTyped(nestedList NestedInteger) *NestedIterator {
	iterator := &NestedIterator{}
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

func (design *NestedIterator) next() int {
	value := design.values[design.cursor]
	design.cursor++
	return value
}

func (design *NestedIterator) hasNext() bool {
	return design.cursor < len(design.values)
}
