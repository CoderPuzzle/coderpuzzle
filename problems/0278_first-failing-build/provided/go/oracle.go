package main

// Problem-provided oracle (BuildInspector), Go side. Compiled beside
// every submission by the judge; never editable in the editor.
// Constructed from the case state: the hidden first bad version as a
// generic value, then the query budget.
type BuildInspector struct {
	bad    int64
	budget int64
}

// NewBuildInspector builds the oracle from the case's construction value
// (the hidden first bad version) and the query budget.
func NewBuildInspector(construction []any, budget int64) *BuildInspector {
	bad, ok := construction[0].(int64)
	if !ok {
		panic("BuildInspector bad must be an integer")
	}
	return &BuildInspector{bad: bad, budget: budget}
}

// IsFailingBuild reports whether version fails the quality check.
func (control *BuildInspector) IsFailingBuild(version int) bool {
	if control.budget <= 0 {
		panic("BuildInspector query budget exhausted")
	}
	control.budget--
	return int64(version) >= control.bad
}
