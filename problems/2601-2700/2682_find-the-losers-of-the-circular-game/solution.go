// Straight simulation: friend 1 holds the ball at the start, and each turn i
// moves the holder i*k seats clockwise. At most n turns pass before some
// friend receives the ball twice; i*k <= 2500 keeps every value comfortably
// inside int.
func circularGameLosers(n int, k int) []int {
	received := make([]bool, n)
	received[0] = true
	holder := 0
	turn := 1
	for {
		holder = (holder + turn*k) % n
		if received[holder] {
			break
		}
		received[holder] = true
		turn++
	}
	losers := []int{}
	for friend := 0; friend < n; friend++ {
		if !received[friend] {
			losers = append(losers, friend+1)
		}
	}
	return losers
}
