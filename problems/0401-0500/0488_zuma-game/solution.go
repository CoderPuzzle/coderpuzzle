import (
	"strconv"
	"strings"
)

// Memoized search over (row, remaining hand). Only balls inserted directly
// alongside a same-colored run are tried: a ball dropped between foreign
// colors cannot join a removal before its neighbors merge, so deferring its
// insertion to that merge never costs more.
func findMinStep(board string, hand string) int {
	colors := "RYBGW"
	counts := make([]int, 5)
	for _, ch := range []byte(hand) {
		counts[strings.IndexByte(colors, ch)]++
	}
	memo := map[string]int{}
	const impossible = 100 // above any answer: the hand holds at most 5 balls

	// The cascade as a pure function: one pass drops every maximal run of
	// three or more, the loop settles the joins that their removal opens up.
	clean := func(row string) string {
		removed := true
		for removed {
			removed = false
			kept := []string{}
			i := 0
			for i < len(row) {
				j := i
				for j < len(row) && row[j] == row[i] {
					j++
				}
				if j-i < 3 {
					kept = append(kept, row[i:j])
				} else {
					removed = true
				}
				i = j
			}
			row = strings.Join(kept, "")
		}
		return row
	}

	// Row + "|" + the five hand counts keys the memo; the counts stay
	// single-digit (the hand holds at most 5 balls), so the concatenation
	// is unambiguous.
	var solve func(row string, remaining []int) int
	solve = func(row string, remaining []int) int {
		if row == "" {
			return 0
		}
		key := row + "|"
		for _, count := range remaining {
			key += strconv.Itoa(count)
		}
		if answer, seen := memo[key]; seen {
			return answer
		}
		best := impossible
		i := 0
		for i < len(row) {
			j := i
			for j < len(row) && row[j] == row[i] {
				j++
			}
			color := strings.IndexByte(colors, row[i])
			if remaining[color] > 0 {
				// One canonical gap per run: sliding the ball along the run
				// it joins produces the identical next row.
				remaining[color]--
				sub := solve(clean(row[:i]+string(row[i])+row[i:]), remaining)
				best = min(best, sub+1)
				remaining[color]++
			}
			i = j
		}
		memo[key] = best
		return best
	}

	best := solve(board, counts)
	if best < impossible {
		return best
	}
	return -1
}
