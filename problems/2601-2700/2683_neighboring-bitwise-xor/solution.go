func doesValidArrayExist(derived []int) bool {
	// Each original element enters exactly two derived entries (its own slot
	// and its neighbour's), so folding derived with XOR cancels every pair
	// and lands on 0 exactly when a valid original exists.
	total := 0
	for _, value := range derived {
		total ^= value
	}
	return total == 0
}
