// Invert to days: days[p] is the turn on which position p lights. A window
// (i, i+k+1) qualifies exactly when both endpoints light before every
// interior position, and it qualifies on the day max(days[i], days[i+k+1]);
// the answer is the minimum such day.
func kEmptySlots(bulbs []int, k int) int {
	n := len(bulbs)
	if n < k+2 {
		return -1
	}
	days := make([]int, n)
	for day, position := range bulbs {
		days[position-1] = day + 1
	}
	best := -1
	window := make([]int, 0, n)
	// The interior [right-k, right-1] slides one position at a time; the
	// deque keeps indices of strictly increasing day values, so its front is
	// always the interior minimum.
	for index := 1; index < k; index++ {
		for len(window) > 0 && days[window[len(window)-1]] >= days[index] {
			window = window[:len(window)-1]
		}
		window = append(window, index)
	}
	for right := k + 1; right < n; right++ {
		entering := right - 1
		for len(window) > 0 && days[window[len(window)-1]] >= days[entering] {
			window = window[:len(window)-1]
		}
		window = append(window, entering)
		for len(window) > 0 && window[0] < right-k {
			window = window[1:]
		}
		pairDay := max(days[right-k-1], days[right])
		if (k == 0 || days[window[0]] > pairDay) && (best == -1 || pairDay < best) {
			best = pairDay
		}
	}
	return best
}
