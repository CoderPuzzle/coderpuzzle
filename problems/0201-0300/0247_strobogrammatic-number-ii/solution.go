func findStrobogrammatic(n int) []string {
	// A strobogrammatic number of length n is one wrapping pair around one
	// of length n - 2, so the recursion shrinks by 2 per level — down to an
	// empty core (even n) or one self-rotating digit (odd n).
	var build func(length int, outer bool) []string
	build = func(length int, outer bool) []string {
		if length == 0 {
			return []string{""}
		}
		if length == 1 {
			return []string{"0", "1", "8"}
		}
		// "00" would put a leading zero on the whole number, so it may wrap
		// only inner layers, never the outermost.
		pairs := []string{"11", "69", "88", "96"}
		if !outer {
			pairs = []string{"00", "11", "69", "88", "96"}
		}
		inners := build(length-2, false)
		results := make([]string, 0, len(pairs)*len(inners))
		// Pairs ascend by their left digit and every wrapped result has the
		// same length, so each layer emits its list in ascending
		// lexicographic order already — no final sort needed.
		for _, pair := range pairs {
			for _, inner := range inners {
				results = append(results, string(pair[0])+inner+string(pair[1]))
			}
		}
		return results
	}
	return build(n, true)
}
