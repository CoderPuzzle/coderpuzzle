func numSquares(n int) int {
	// The squares available as subtractions, ascending — so the inner loop
	// can break as soon as s exceeds the remainder.
	squares := make([]int, 0)
	for i := 1; i*i <= n; i++ {
		squares = append(squares, i*i)
	}
	// Level-by-level BFS over remainders: level k holds every value
	// reachable from n by subtracting exactly k squares.
	level := map[int]bool{n: true}
	seen := map[int]bool{n: true}
	steps := 0
	for len(level) > 0 {
		steps++
		next := map[int]bool{}
		for r := range level {
			for _, s := range squares {
				if s > r {
					break
				}
				t := r - s
				// Reaching 0 at this depth settles the answer.
				if t == 0 {
					return steps
				}
				// First sight of a remainder is its shallowest depth; a
				// revisit through another square can never beat it.
				if !seen[t] {
					seen[t] = true
					next[t] = true
				}
			}
		}
		level = next
	}
	// Lagrange's four-square theorem bounds the search at four levels, so
	// the loop always returns from inside.
	return steps
}
