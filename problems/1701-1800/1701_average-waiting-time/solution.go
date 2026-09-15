// Each customer's wait is settled the moment the previous order is
// scheduled: the chef starts at max(freeAt, arrival), finishes at
// start + time, and the wait is finish - arrival. The arrivals are
// sorted, so one forward sweep carrying the chef's free time replays
// the whole day. The waits total as exact integers — the deepest legal
// queue sums to about 5 * 10^13 — and Go's 64-bit int carries that
// exactly; the single division at the end is the only floating-point
// step.
func averageWaitingTime(customers [][]int) float64 {
	totalWaiting := 0
	freeAt := 0
	for _, customer := range customers {
		arrival := customer[0]
		start := max(freeAt, arrival)
		freeAt = start + customer[1]
		totalWaiting += freeAt - arrival
	}
	return float64(totalWaiting) / float64(len(customers))
}
