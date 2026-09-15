func singleNumber(nums []int) int {
	// Parity hash set: the first sight of a value adds it, the second
	// removes it — a paired element erases its own trace, so the set holds
	// exactly the values seen an odd number of times.
	seen := make(map[int]bool)
	for _, value := range nums {
		if seen[value] {
			delete(seen, value)
		} else {
			seen[value] = true
		}
	}
	// Fold the odd-count survivors with XOR: even-count values cancel in
	// any XOR fold anyway, so this equals folding the whole array.
	result := 0
	for value := range seen {
		result ^= value
	}
	return result
}
