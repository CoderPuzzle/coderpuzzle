// Sort into x <= y <= z so the two gaps (empty slots between neighbors)
// are easy to read off.
func numMovesStones(a int, b int, c int) []int {
	x, y, z := a, b, c
	if x > y {
		x, y = y, x
	}
	if y > z {
		y, z = z, y
	}
	if x > y {
		x, y = y, x
	}
	if y-x == 1 && z-y == 1 {
		// No empty slots at all: already consecutive.
		return []int{0, 0}
	}
	// One move suffices whenever a gap is 0 or 1 stone-width wide, since
	// the far stone can jump straight into what remains.
	minMoves := 2
	if y-x <= 2 || z-y <= 2 {
		minMoves = 1
	}
	// Every move shrinks the spread z - x by exactly 1 in the best case,
	// and the spread must end at 2 (three consecutive values), so the
	// maximum is the total number of empty slots.
	maxMoves := z - x - 2
	return []int{minMoves, maxMoves}
}
