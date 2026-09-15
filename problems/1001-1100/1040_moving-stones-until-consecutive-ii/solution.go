import "sort"

// Sort the stones, then combine a two-sided formula for the maximum with a
// sliding window for the minimum.
func numMovesStonesII(stones []int) []int {
	sort.Ints(stones)
	n := len(stones)
	if stones[n-1]-stones[0] == n-1 {
		// Already n consecutive integers: no legal move exists.
		return []int{0, 0}
	}

	// Maximum: play it out from whichever side wastes fewer stones. Losing
	// the low side (never touching it) wastes stones[1] - stones[0] of
	// already-occupied span; losing the high side wastes
	// stones[n-1] - stones[n-2]. Take the larger resulting move count.
	maxMoves := stones[n-1] - stones[1] - (n - 2)
	if alt := stones[n-2] - stones[0] - (n - 2); alt > maxMoves {
		maxMoves = alt
	}

	// Minimum: slide a window of n consecutive integer values across the
	// sorted positions; a window already holding k stones needs n - k moves
	// to fill the rest.
	minMoves := n
	left := 0
	for right := 0; right < n; right++ {
		for stones[right]-stones[left]+1 > n {
			left++
		}
		alreadyPlaced := right - left + 1
		cost := n - alreadyPlaced
		if cost == 1 && alreadyPlaced == n-1 && stones[right]-stones[left] == n-2 {
			// Classic gotcha: n - 1 stones already packed with zero gaps.
			// The lone outside stone can't jump straight into the missing
			// slot without still being an endpoint, so it needs a
			// throwaway hop first -- 2 moves, not 1.
			cost = 2
		}
		if cost < minMoves {
			minMoves = cost
		}
	}

	return []int{minMoves, maxMoves}
}
