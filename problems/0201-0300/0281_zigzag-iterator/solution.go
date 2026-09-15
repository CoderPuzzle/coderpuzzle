// Two read positions — one per vector — and a turn flag naming the vector
// that serves next. Nothing is flattened or queued at construction: the
// whole zigzag policy lives in next, which hands the turn to the other
// vector when the one whose turn it is has run dry. hasNext is a pure
// query — one live index anywhere means elements remain — so it never
// mutates state and any number of calls between nexts is harmless.
type ZigzagIterator struct {
	v1   []int
	v2   []int
	i1   int
	i2   int
	turn int
}

func NewZigzagIteratorTyped(v1 []int, v2 []int) *ZigzagIterator {
	// No copies, no queue: only how far each vector has been served
	// (i1, i2) and whose turn is next (0 for v1, 1 for v2).
	return &ZigzagIterator{v1: v1, v2: v2}
}

func (design *ZigzagIterator) next() int {
	// A vector whose turn it is may have run dry — it was the shorter
	// one, or its last element was just served — and then the turn
	// passes to the other before anything is read.
	if design.turn == 0 && design.i1 == len(design.v1) {
		design.turn = 1
	}
	if design.turn == 1 && design.i2 == len(design.v2) {
		design.turn = 0
	}
	var value int
	if design.turn == 0 {
		value = design.v1[design.i1]
		design.i1++
	} else {
		value = design.v2[design.i2]
		design.i2++
	}
	// Serve one element, then hand the turn over unconditionally: the
	// vectors alternate strictly while both still have elements.
	design.turn = 1 - design.turn
	return value
}

func (design *ZigzagIterator) hasNext() bool {
	// Pure query: the turn flag is irrelevant to whether anything
	// remains — one live index anywhere means yes.
	return design.i1 < len(design.v1) || design.i2 < len(design.v2)
}
