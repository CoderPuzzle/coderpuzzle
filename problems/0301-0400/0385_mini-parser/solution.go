import "strconv"

func deserialize(s string) NestedInteger {
	if s[0] != '[' {
		number, _ := strconv.Atoi(s)
		leaf := NestedInteger{}
		leaf.SetInteger(number)
		return leaf
	}
	stack := []NestedInteger{NestedInteger{}}
	var root NestedInteger
	index := 1
	for index < len(s) {
		ch := s[index]
		if ch == '[' {
			stack = append(stack, NestedInteger{})
			index++
		} else if ch == ']' {
			node := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			if len(stack) == 0 {
				root = node
			} else {
				stack[len(stack)-1].Add(node)
			}
			index++
		} else if ch == ',' {
			index++
		} else {
			start := index
			for s[index] != ',' && s[index] != ']' {
				index++
			}
			number, _ := strconv.Atoi(s[start:index])
			leaf := NestedInteger{}
			leaf.SetInteger(number)
			stack[len(stack)-1].Add(leaf)
		}
	}
	return root
}
