func depthSumInverse(nested NestedInteger) int {
	level := append([]*NestedInteger{}, nested.GetList()...)
	total := 0
	flat := 0
	for len(level) > 0 {
		var nextLevel []*NestedInteger
		levelSum := 0
		for _, node := range level {
			if node.IsInteger() {
				levelSum += node.GetInteger()
			} else {
				nextLevel = append(nextLevel, node.GetList()...)
			}
		}
		flat += levelSum
		total += flat
		level = nextLevel
	}
	return total
}
