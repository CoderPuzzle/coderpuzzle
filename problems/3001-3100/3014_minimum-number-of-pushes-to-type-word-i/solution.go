func minimumPushes(word string) int {
	// Distinct letters make frequency irrelevant: dealing them round-robin
	// over the 8 keys costs the p-th letter p/8 + 1 pushes.
	total := 0
	for position := 0; position < len(word); position++ {
		total += position/8 + 1
	}
	return total
}
