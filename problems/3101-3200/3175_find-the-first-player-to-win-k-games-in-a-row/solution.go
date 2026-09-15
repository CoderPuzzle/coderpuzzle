// Challengers arrive in index order exactly as in the queue, so one
// king-of-the-hill pass reproduces every game until someone hits k wins.
// If no one does by then the champion holds the global top skill and can
// never lose again.
func findWinningPlayer(skills []int, k int) int {
	idx, wins := 0, 0
	for i := 1; i < len(skills); i++ {
		if skills[i] > skills[idx] {
			idx = i
			wins = 1
		} else {
			wins++
		}
		if wins == k {
			return idx
		}
	}
	return idx
}
