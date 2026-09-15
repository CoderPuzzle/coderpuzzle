func equationsPossible(equations []string) bool {
	// Each letter starts as its own class; parent[x] names its root.
	var parent [26]int
	for letter := 0; letter < 26; letter++ {
		parent[letter] = letter
	}
	find := func(letter int) int {
		// Iterative find with path compression: chase to the root, then
		// point every visited letter straight at it.
		root := letter
		for parent[root] != root {
			root = parent[root]
		}
		for parent[letter] != root {
			next := parent[letter]
			parent[letter] = root
			letter = next
		}
		return root
	}
	// Pass one fuses every equality, so each class is the full set of
	// letters some chain of '==' has tied together.
	for _, equation := range equations {
		if equation[1] == '=' {
			left := find(int(equation[0] - 'a'))
			parent[left] = find(int(equation[3] - 'a'))
		}
	}
	// Pass two judges the disequalities: an inequality whose sides sit
	// in one class is unsatisfiable, since both must take one value.
	for _, equation := range equations {
		if equation[1] == '!' {
			if find(int(equation[0]-'a')) == find(int(equation[3]-'a')) {
				return false
			}
		}
	}
	return true
}
