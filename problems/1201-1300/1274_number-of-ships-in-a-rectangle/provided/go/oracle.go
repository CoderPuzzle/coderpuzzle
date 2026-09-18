package main

// Problem-provided oracle (Sea), Go side. Compiled beside every
// submission by the judge; never editable in the editor. Constructed
// from the case state: the hidden ship points as generic values, then
// the query budget.
type Sea struct {
	ships  [][2]int
	budget int64
}

// NewSea builds the oracle from the case's construction values (the
// ship points as one generic slice of pairs) and the query budget.
func NewSea(construction []any, budget int64) *Sea {
	points, ok := construction[0].([]any)
	if !ok {
		panic("Sea ship data must be an array")
	}
	ships := make([][2]int, 0, len(points))
	for _, point := range points {
		pair, ok := point.([]any)
		if !ok || len(pair) != 2 {
			panic("Sea ship data must hold point pairs")
		}
		x, okX := pair[0].(int64)
		y, okY := pair[1].(int64)
		if !okX || !okY {
			panic("Sea ship points must be integers")
		}
		ships = append(ships, [2]int{int(x), int(y)})
	}
	return &Sea{ships: ships, budget: budget}
}

// HasShips reports whether the closed rectangle spanned by the two
// corners holds at least one ship, boundary included.
func (ocean *Sea) HasShips(topRight []int, bottomLeft []int) bool {
	if ocean.budget <= 0 {
		panic("Sea query budget exhausted")
	}
	ocean.budget--
	for _, ship := range ocean.ships {
		if ship[0] >= bottomLeft[0] && ship[0] <= topRight[0] &&
			ship[1] >= bottomLeft[1] && ship[1] <= topRight[1] {
			return true
		}
	}
	return false
}
