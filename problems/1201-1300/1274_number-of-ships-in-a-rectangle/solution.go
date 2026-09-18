package main

type Solution struct{}

func (solution *Solution) countShips(ocean *Sea, topRight []int, bottomLeft []int) int {
	// A split can hand a child an empty rectangle; reject it without
	// spending a query.
	if bottomLeft[0] > topRight[0] || bottomLeft[1] > topRight[1] {
		return 0
	}
	// One query retires the whole subtree when the box is empty water.
	if !ocean.HasShips(topRight, bottomLeft) {
		return 0
	}
	// A single point that answered yes holds exactly one ship.
	if topRight[0] == bottomLeft[0] && topRight[1] == bottomLeft[1] {
		return 1
	}
	midX := (topRight[0] + bottomLeft[0]) / 2
	midY := (topRight[1] + bottomLeft[1]) / 2
	return solution.countShips(ocean, []int{midX, midY}, bottomLeft) +
		solution.countShips(ocean, []int{midX, topRight[1]}, []int{bottomLeft[0], midY + 1}) +
		solution.countShips(ocean, []int{topRight[0], midY}, []int{midX + 1, bottomLeft[1]}) +
		solution.countShips(ocean, topRight, []int{midX + 1, midY + 1})
}
