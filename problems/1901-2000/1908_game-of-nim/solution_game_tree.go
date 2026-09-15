import (
	"fmt"
	"sort"
)

// Game-tree DP: the mover with no stones left to take loses, and a
// position is won exactly when some move — pick a pile, reduce it —
// strands the opponent on a lost position. Memoize on the sorted pile
// vector: pile order never changes the move options, so every distinct
// position is decided exactly once.
func nimGame(piles []int) bool {
	state := append([]int(nil), piles...)
	sort.Ints(state)
	return wins(state, make(map[string]bool))
}

// wins reports whether the player to move from the sorted position state
// can force a win, memoized on that canonical shape.
func wins(state []int, memo map[string]bool) bool {
	key := fmt.Sprint(state)
	if won, ok := memo[key]; ok {
		return won
	}
	for i, remain := range state {
		for take := 1; take <= remain; take++ {
			nxt := append([]int(nil), state...)
			nxt[i] -= take
			sort.Ints(nxt)
			if !wins(nxt, memo) {
				memo[key] = true
				return true
			}
		}
	}
	memo[key] = false
	return false
}
