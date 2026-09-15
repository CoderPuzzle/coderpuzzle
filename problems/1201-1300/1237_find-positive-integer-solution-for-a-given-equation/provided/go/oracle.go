// Problem-provided oracle (the hidden f(x, y) wire). The wrapper constructs
// the oracle from its tagged case values plus the query budget; values[0]
// is the generic case integer for function_id. Evaluated in int64 so the
// largest formula (x^3 + y^3 at the 1000 x 1000 corner, 2e9) stays exact.
package main

type CustomFunction struct {
	functionId int
	budget     int64
}

// NewCustomFunction builds the oracle from the case's construction values
// (one integer: the hidden formula's id) and the query budget.
func NewCustomFunction(construction []any, budget int64) *CustomFunction {
	id, ok := construction[0].(int64)
	if !ok {
		panic("Oracle function_id must be an integer")
	}
	return &CustomFunction{functionId: int(id), budget: budget}
}

// F returns some positive integer f(x, y) for two positive integers x and y
// based on a formula.
func (custom *CustomFunction) F(x int, y int) int {
	if custom.budget <= 0 {
		panic("Oracle query budget exhausted")
	}
	custom.budget--
	a, b := int64(x), int64(y)
	var value int64
	switch custom.functionId {
	case 1:
		value = a + b
	case 2:
		value = a * b
	case 3:
		value = a*a + b
	case 4:
		value = a + b*b
	case 5:
		value = a*a + b*b
	case 6:
		value = 10*a + b
	case 7:
		value = a*a*a + b*b*b
	case 8:
		value = (a + b) * (a + b)
	case 9:
		value = a*b + a + b
	default:
		panic("Unknown function_id")
	}
	return int(value)
}
