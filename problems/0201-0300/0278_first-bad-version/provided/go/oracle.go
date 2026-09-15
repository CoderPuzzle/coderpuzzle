package main

// Problem-provided oracle (VersionControl), Go side. Compiled beside
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the hidden first bad version as a
// generic value, then the query budget.
type VersionControl struct {
	bad    int64
	budget int64
}

// NewVersionControl builds the oracle from the case's construction value
// (the hidden first bad version) and the query budget.
func NewVersionControl(construction []any, budget int64) *VersionControl {
	bad, ok := construction[0].(int64)
	if !ok {
		panic("VersionControl bad must be an integer")
	}
	return &VersionControl{bad: bad, budget: budget}
}

// IsBadVersion reports whether version fails the quality check.
func (control *VersionControl) IsBadVersion(version int) bool {
	if control.budget <= 0 {
		panic("VersionControl query budget exhausted")
	}
	control.budget--
	return int64(version) >= control.bad
}
