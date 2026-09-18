package main

// Problem-provided oracle (Master), Go side. Compiled beside
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the wordlist and the secret word as
// generic values, then the guess budget.
type Master struct {
	secret string
	found  bool
	budget int64
}

// NewMaster builds the oracle from the case's construction values
// (the wordlist and the secret word) and the guess budget.
func NewMaster(construction []any, budget int64) *Master {
	if _, ok := construction[0].([]any); !ok {
		panic("Master wordlist must be an array")
	}
	secret, ok := construction[1].(string)
	if !ok {
		panic("Master secret must be a string")
	}
	return &Master{secret: secret, budget: budget}
}

// Guess answers the number of positions where word and the secret word
// agree, and records whether the secret itself was named.
func (interrogator *Master) Guess(word string) int {
	if interrogator.budget <= 0 {
		panic("Master guess budget exhausted")
	}
	interrogator.budget--
	if word == interrogator.secret {
		interrogator.found = true
	}
	matches := 0
	n := len(word)
	if len(interrogator.secret) < n {
		n = len(interrogator.secret)
	}
	for i := 0; i < n; i++ {
		if word[i] == interrogator.secret[i] {
			matches++
		}
	}
	return matches
}

// Verdict reports whether the secret word was named within the budget.
func (interrogator *Master) Verdict() any {
	return interrogator.found
}
