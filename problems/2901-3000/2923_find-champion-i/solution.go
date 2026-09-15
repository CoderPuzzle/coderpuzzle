// The guarantees make "stronger than" a strict total order, so the champion
// is simply its maximum. Keep the strongest team seen so far and let every
// later team challenge it: one cell read decides each challenge, and the
// survivor of all n - 1 of them never lost.
func findChampion(grid [][]int) int {
	champion := 0
	for team := 1; team < len(grid); team++ {
		if grid[team][champion] == 1 {
			champion = team
		}
	}
	return champion
}
