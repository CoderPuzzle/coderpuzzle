package main

// One slot per id (index 0 unused) plus ptr, the next id the output is
// waiting for. A value is never the empty string, so an empty slot marks
// "not inserted yet".
type OrderedStream struct {
	slots []string
	ptr   int
}

func NewOrderedStreamTyped(n int) *OrderedStream {
	return &OrderedStream{slots: make([]string, n+1), ptr: 1}
}

func (design *OrderedStream) insert(idKey int, value string) []string {
	design.slots[idKey] = value
	chunk := []string{}
	for design.ptr < len(design.slots) && design.slots[design.ptr] != "" {
		chunk = append(chunk, design.slots[design.ptr])
		design.ptr++
	}
	return chunk
}
