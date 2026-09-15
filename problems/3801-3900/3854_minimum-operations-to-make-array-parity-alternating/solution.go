import "math"

// An alternating array follows one of two templates (even-first or
// odd-first), and every element fits exactly one of them at its index — so
// one pass scores both. The template an element matches pins its value; the
// other pays one operation and may settle at v - 1 or v + 1, whose window
// the slack bounds v+1 / v-1 enclose. Values stay within ±10^9 and the
// width within 2 × 10^9, and int is 64-bit on every judge target, so plain
// int arithmetic carries it all without overflow.
func makeParityAlternating(nums []int) []int {
	ops := [2]int{}
	lo := [2]int{math.MaxInt64, math.MaxInt64}
	hi := [2]int{math.MinInt64, math.MinInt64}
	for i, v := range nums {
		matched := 0
		if v&1 != i&1 {
			matched = 1
		}
		missed := 1 - matched
		ops[missed]++
		if v+1 < lo[missed] {
			lo[missed] = v + 1
		}
		if v-1 > hi[missed] {
			hi[missed] = v - 1
		}
		if v < lo[matched] {
			lo[matched] = v
		}
		if v > hi[matched] {
			hi[matched] = v
		}
	}
	bestOps := math.MaxInt64
	bestSpread := math.MaxInt64
	for t := 0; t < 2; t++ {
		spread := hi[t] - lo[t]
		if ops[t] > 0 && spread < 1 {
			// Paying operations means n >= 2 and the final array
			// alternates, so its spread is at least 1; the slack bounds
			// alone can collapse to 0 (nums = [10, 10]).
			spread = 1
		}
		if ops[t] < bestOps || (ops[t] == bestOps && spread < bestSpread) {
			bestOps = ops[t]
			bestSpread = spread
		}
	}
	return []int{bestOps, bestSpread}
}
