func generateValidStrings(n int, k int) []string {
	// Left-to-right backtracking. At index i a '0' is always allowed; a '1'
	// is allowed only when it does not follow another '1' and its index i
	// keeps the running cost <= k. Trying '0' before '1' emits every valid
	// string in lexicographic order. Recursion depth <= 12.
	out := []string{}
	current := make([]byte, n)
	var build func(index int, prevOne bool, cost int)
	build = func(index int, prevOne bool, cost int) {
		if index == n {
			out = append(out, string(current))
			return
		}
		current[index] = '0'
		build(index+1, false, cost)
		if !prevOne && cost+index <= k {
			current[index] = '1'
			build(index+1, true, cost+index)
		}
	}
	build(0, false, 0)
	return out
}
