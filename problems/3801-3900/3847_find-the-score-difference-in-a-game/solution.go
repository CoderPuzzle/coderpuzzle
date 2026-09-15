func scoreDifference(nums []int) int {
	// Totals stay within 1000 * 1000 = 10^6 and the difference within
	// ±10^6, so int arithmetic carries everything without overflow.
	// One pass with a signed turn: +1 while the first player is active,
	// -1 while the second is. Each rule that fires flips the sign — odd
	// points flip once, a 6th-game index flips once — and when both fire
	// on the same game the flips cancel, exactly the sequential double
	// swap. The active player's points then enter the first-minus-second
	// difference as turn * points.
	diff := 0
	turn := 1
	for i, points := range nums {
		if points%2 == 1 {
			turn = -turn
		}
		if i%6 == 5 {
			turn = -turn
		}
		diff += turn * points
	}
	return diff
}
