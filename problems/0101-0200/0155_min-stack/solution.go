package main

type minStackEntry struct {
	value   int
	minimum int
}

type MinStack struct {
	entries []minStackEntry
}

func NewMinStackTyped() *MinStack {
	return &MinStack{}
}

func (design *MinStack) push(value int) {
	// Snapshot the minimum of the stack as of this push: the new value
	// combined with the minimum of the entry below.
	minimum := value
	if length := len(design.entries); length > 0 {
		if below := design.entries[length-1].minimum; below < minimum {
			minimum = below
		}
	}
	design.entries = append(design.entries, minStackEntry{value: value, minimum: minimum})
}

func (design *MinStack) pop() {
	// A pop restores an earlier stack state whose exposed entry already
	// holds that state's minimum — no recomputation needed.
	design.entries = design.entries[:len(design.entries)-1]
}

func (design *MinStack) top() int {
	return design.entries[len(design.entries)-1].value
}

func (design *MinStack) getMin() int {
	// The top pair alone answers both queries in O(1).
	return design.entries[len(design.entries)-1].minimum
}
