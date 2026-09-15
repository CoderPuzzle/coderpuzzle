import (
	"sort"
)

// Horizontal and vertical moves touch disjoint coordinates, and a
// peaceful board needs row indices {0..n-1} once each (columns too). So
// each axis decouples: pair the k-th smallest coordinate of that axis
// with target index k-1 — rearrangement keeps this optimal. Worst case
// per axis is n*(n-1)/2 <= 124750, so the sum cannot overflow int.
func minMoves(rooks [][]int) int {
	xs := make([]int, len(rooks))
	ys := make([]int, len(rooks))
	for i, rook := range rooks {
		xs[i], ys[i] = rook[0], rook[1]
	}
	sort.Ints(xs)
	sort.Ints(ys)
	moves := 0
	for i := range rooks {
		d := xs[i] - i
		if d < 0 {
			d = -d
		}
		e := ys[i] - i
		if e < 0 {
			e = -e
		}
		moves += d + e
	}
	return moves
}
