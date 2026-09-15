func depthSum(nested NestedInteger) int {
	var walk func(value *NestedInteger, depth int) int
	walk = func(value *NestedInteger, depth int) int {
		if value.IsInteger() {
			return value.GetInteger() * depth
		}
		total := 0
		for _, child := range value.GetList() {
			total += walk(child, depth+1)
		}
		return total
	}
	total := 0
	for _, item := range nested.GetList() {
		total += walk(item, 1)
	}
	return total
}
