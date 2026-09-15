package main

// Problem-provided oracle (Guess), Go side. Compiled beside every
// submission by the judge; never editable in the editor. Constructed
// from the case state: the hidden picked number as a generic value,
// then the query budget.
type Guess struct {
	pick   int64
	budget int64
}

// NewGuess builds the oracle from the case's construction value (the
// hidden picked number) and the query budget.
func NewGuess(construction []any, budget int64) *Guess {
	pick, ok := construction[0].(int64)
	if !ok {
		panic("Guess pick must be an integer")
	}
	return &Guess{pick: pick, budget: budget}
}

// Guess reports how num compares to the picked number: -1 when num sits
// above it, 1 when below it, 0 when exactly it.
func (guess *Guess) Guess(num int) int {
	if guess.budget <= 0 {
		panic("Guess query budget exhausted")
	}
	guess.budget--
	if int64(num) > guess.pick {
		return -1
	}
	if int64(num) < guess.pick {
		return 1
	}
	return 0
}
