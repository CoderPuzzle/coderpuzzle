package main

// Problem-provided oracle (HiddenNumber), Go side. Compiled beside every
// submission by the judge; never editable in the editor. Constructed
// from the case state: the hidden number as a generic value, then the
// query budget.
type HiddenNumber struct {
	n      int64
	budget int64
}

// NewHiddenNumber builds the oracle from the case's construction value
// (the hidden number) and the query budget.
func NewHiddenNumber(construction []any, budget int64) *HiddenNumber {
	n, ok := construction[0].(int64)
	if !ok {
		panic("HiddenNumber n must be an integer")
	}
	return &HiddenNumber{n: n, budget: budget}
}

// CommonSetBits reports how many bits num shares with the hidden n —
// the popcount of their bitwise AND.
func (hiddenNumber *HiddenNumber) CommonSetBits(num int) int {
	if hiddenNumber.budget <= 0 {
		panic("HiddenNumber query budget exhausted")
	}
	hiddenNumber.budget--
	count := 0
	for shared := uint64(int64(num)) & uint64(hiddenNumber.n); shared != 0; shared >>= 1 {
		count += int(shared & 1)
	}
	return count
}
