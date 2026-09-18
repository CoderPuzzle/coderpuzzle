package main

// Problem-provided oracle (InfiniteStream), Go side. Compiled beside every
// submission by the judge; never editable in the editor. Constructed
// from the case state: the recorded bit prefix as generic values, then
// the query budget.
type InfiniteStream struct {
	bits     []int
	position int
	budget   int64
}

// NewInfiniteStream builds the oracle from the case's construction values
// (the recorded prefix as one generic slice of bits) and the query
// budget.
func NewInfiniteStream(construction []any, budget int64) *InfiniteStream {
	items, ok := construction[0].([]any)
	if !ok {
		panic("InfiniteStream bits must be an array")
	}
	bits := make([]int, 0, len(items))
	for _, item := range items {
		value, ok := item.(int64)
		if !ok {
			panic("InfiniteStream bits must be integers")
		}
		bits = append(bits, int(value))
	}
	return &InfiniteStream{bits: bits, budget: budget}
}

// Next returns the next bit of the recorded prefix, in order.
func (stream *InfiniteStream) Next() int {
	if stream.budget <= 0 {
		panic("InfiniteStream query budget exhausted")
	}
	stream.budget--
	value := stream.bits[stream.position]
	stream.position++
	return value
}
