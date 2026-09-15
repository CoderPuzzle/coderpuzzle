package main

type Solution struct{}

func (solution *Solution) findSolution(customfunction *CustomFunction, z int) [][]int {
	pairs := [][]int{}
	x, y := 1, 1000
	for x <= 1000 && y >= 1 {
		value := customfunction.F(x, y)
		if value == z {
			pairs = append(pairs, []int{x, y})
			x++
			y--
		} else if value < z {
			x++
		} else {
			y--
		}
	}
	return pairs
}
