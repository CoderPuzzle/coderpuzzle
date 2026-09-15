// need[j] is the least health that saves the knight from column j of the row
// being folded; index n is a sentinel wall past the right edge.
func calculateMinimumHP(dungeon [][]int) int {
	n := len(dungeon[0])
	need := make([]int, n+1)
	for j := range need {
		need[j] = 1_000_000_000
	}
	need[n-1] = 1
	for i := len(dungeon) - 1; i >= 0; i-- {
		for j := n - 1; j >= 0; j-- {
			// Scan right-to-left: need[j] is still the room below while
			// need[j+1] is already this row, exactly the two moves.
			need[j] = max(1, min(need[j], need[j+1])-dungeon[i][j])
		}
	}
	return need[0]
}
