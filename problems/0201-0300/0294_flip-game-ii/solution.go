import (
	"fmt"
	"sort"
	"strings"
)

// The player to move wins exactly when some flip of a "++" hands the
// opponent a position from which they cannot win; a position with no "++"
// left is a loss. A flip never crosses a '-', so the game decomposes into
// independent '+'-runs: memoize on the sorted lengths of the live runs
// (>= 2), which alone decide the position.
func canWin(currentState string) bool {
	memo := map[string]bool{}
	var runs []int
	for _, run := range strings.Split(currentState, "-") {
		if run != "" {
			runs = append(runs, len(run))
		}
	}
	return canWinRuns(runs, memo)
}

func canWinRuns(runs []int, memo map[string]bool) bool {
	live := make([]int, 0, len(runs))
	for _, length := range runs {
		if length >= 2 {
			live = append(live, length)
		}
	}
	sort.Ints(live)
	key := fmt.Sprint(live)
	if won, ok := memo[key]; ok {
		return won
	}
	winner := false
	for index, length := range live {
		if winner {
			break
		}
		others := append(append([]int(nil), live[:index]...), live[index+1:]...)
		// Flipping spot i inside `length` leaves runs i and length-2-i; the
		// mirror split makes the same successor, so half the range.
		for i := 0; i <= (length-2)/2 && !winner; i++ {
			next := append([]int(nil), others...)
			if i >= 2 {
				next = append(next, i)
			}
			if length-2-i >= 2 {
				next = append(next, length-2-i)
			}
			if !canWinRuns(next, memo) {
				winner = true
			}
		}
	}
	memo[key] = winner
	return winner
}
