// Two ceilings bound the load independently: the deck offers n*n cells, and
// the weight budget fits maxWeight / w containers of uniform weight w. Any
// count up to the smaller one is realizable, so the answer is that minimum.
// Every value stays at or below 10^9 — inside 32-bit range.
func maxContainers(n int, w int, maxWeight int) int {
	return min(n*n, maxWeight/w)
}
