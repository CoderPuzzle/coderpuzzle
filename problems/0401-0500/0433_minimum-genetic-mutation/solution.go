// BFS over the mutation graph: genes are nodes, edges join genes that differ
// in exactly one of the 8 characters, and every step after the first must
// land on a bank entry.
func minMutation(startGene string, endGene string, bank []string) int {
	// Already there: no character has to change, and no path through the
	// bank can beat zero mutations.
	if startGene == endGene {
		return 0
	}
	visited := make([]bool, len(bank))
	frontier := []string{startGene}
	depth := 0
	for len(frontier) > 0 {
		depth++
		var next []string
		for _, gene := range frontier {
			for i, candidate := range bank {
				if visited[i] || differences(gene, candidate) != 1 {
					continue
				}
				if candidate == endGene {
					return depth
				}
				visited[i] = true
				next = append(next, candidate)
			}
		}
		frontier = next
	}
	return -1
}

// differences counts the positions in which two equal-length genes differ.
func differences(a, b string) int {
	count := 0
	for i := 0; i < len(a); i++ {
		if a[i] != b[i] {
			count++
		}
	}
	return count
}
