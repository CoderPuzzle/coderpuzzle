func maxDepthAfterSplit(seq string) []int {
	answer := make([]int, len(seq))
	stack := []int{} // group id of each still-open parenthesis
	depth := [2]int{}
	last := 0
	for i := 0; i < len(seq); i++ {
		if seq[i] == '(' {
			// Open in the shallower group; on a tie reuse the group the
			// previous '(' joined, so the depth gap never exceeds one.
			group := last
			if depth[0] < depth[1] {
				group = 0
			} else if depth[1] < depth[0] {
				group = 1
			}
			answer[i] = group
			stack = append(stack, group)
			depth[group]++
			last = group
		} else {
			// A ')' must close the matching '(' in the same group.
			group := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			depth[group]--
			answer[i] = group
		}
	}
	return answer
}
