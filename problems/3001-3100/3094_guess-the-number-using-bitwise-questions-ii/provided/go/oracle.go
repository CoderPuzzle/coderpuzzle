package main

// Problem-provided oracle (CommonBits), Go side. Compiled beside every
// submission by the judge; never editable in the editor. Constructed
// from the case state: the initial hidden number as a generic value,
// then the query budget.
type CommonBits struct {
	n      int
	budget int64
}

// NewCommonBits builds the oracle from the case's construction value
// (the initial hidden number) and the query budget.
func NewCommonBits(construction []any, budget int64) *CommonBits {
	n, ok := construction[0].(int64)
	if !ok {
		panic("CommonBits n must be an integer")
	}
	return &CommonBits{n: int(n), budget: budget}
}

// CommonBits reports how many of the low 30 bits of the current number
// agree with num, then flips those bits (n ^= num).
func (commonBits *CommonBits) CommonBits(num int) int {
	if commonBits.budget <= 0 {
		panic("CommonBits query budget exhausted")
	}
	commonBits.budget--
	diff := (commonBits.n ^ num) & ((1 << 30) - 1)
	commonBits.n ^= num
	return 30 - bitsOnes(diff)
}

func bitsOnes(value int) int {
	count := 0
	for value != 0 {
		count += value & 1
		value >>= 1
	}
	return count
}
