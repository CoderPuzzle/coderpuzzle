// A cursor over the runs of the encoding: the iterator never decodes
// anything — next(n) walks forward while the current run's remaining count
// is smaller than n, spending each exhausted run's remainder on n as it
// passes, then decrements the first run rich enough to supply the n-th
// element and returns that run's value.
type RLEIterator struct {
	a []int
	i int
}

func NewRLEIteratorTyped(encoding []int) *RLEIterator {
	return &RLEIterator{a: encoding}
}

func (design *RLEIterator) next(n int) int {
	// Walk forward while the current run cannot supply the n-th element;
	// a run of length zero never stops this walk (0 is smaller than any n).
	for design.i < len(design.a) && design.a[design.i] < n {
		n -= design.a[design.i]
		design.i += 2
	}
	if design.i >= len(design.a) {
		// The walk ran off the end: the n-th element does not exist, and
		// every remaining run was consumed along the way.
		return -1
	}
	design.a[design.i] -= n
	return design.a[design.i+1]
}
