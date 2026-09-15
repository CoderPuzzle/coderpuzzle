// Only the node holding genetic value 1 and its ancestors can have answers
// other than 1. Each newly exposed part of their subtrees is marked once.
func smallestMissingValueSubtree(parents []int, nums []int) []int {
	n := len(parents)
	children := make([][]int, n)
	oneNode := -1
	for node := 0; node < n; node++ {
		if parents[node] != -1 {
			children[parents[node]] = append(children[parents[node]], node)
		}
		if nums[node] == 1 {
			oneNode = node
		}
	}

	answers := make([]int, n)
	for node := range answers {
		answers[node] = 1
	}
	if oneNode == -1 {
		return answers
	}

	visited := make([]bool, n)
	present := make([]bool, n+2)
	missing := 1
	for ancestor := oneNode; ancestor != -1; ancestor = parents[ancestor] {
		stack := []int{ancestor}
		for len(stack) > 0 {
			node := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			if visited[node] {
				continue
			}
			visited[node] = true
			if nums[node] < len(present) {
				present[nums[node]] = true
			}
			stack = append(stack, children[node]...)
		}
		for present[missing] {
			missing++
		}
		answers[ancestor] = missing
	}
	return answers
}
