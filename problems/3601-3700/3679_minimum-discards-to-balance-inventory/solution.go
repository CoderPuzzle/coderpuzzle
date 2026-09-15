func minArrivalsToDiscard(arrivals []int, w int, m int) int {
	// cnt holds how many kept arrivals of each type sit inside the current
	// w-day window; kept[i] records whether day i was kept, since a
	// discarded arrival never entered the counts and must not be
	// decremented when its day slides out of the window.
	cnt := map[int]int{}
	kept := make([]bool, len(arrivals))
	discards := 0
	for i, arrival := range arrivals {
		if i >= w && kept[i-w] {
			cnt[arrivals[i-w]]--
		}
		if cnt[arrival] == m {
			discards++
		} else {
			kept[i] = true
			cnt[arrival]++
		}
	}
	return discards
}
