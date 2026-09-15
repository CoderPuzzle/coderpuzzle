package main

type DetectSquares struct {
	frequencies map[int]int
}

func NewDetectSquaresTyped() *DetectSquares {
	return &DetectSquares{frequencies: make(map[int]int)}
}

func (design *DetectSquares) add(point []int) {
	design.frequencies[encode(point[0], point[1])]++
}

func (design *DetectSquares) count(point []int) int {
	x, y := point[0], point[1]
	var total int64
	for key, horizontal := range design.frequencies {
		x2, y2 := key/1001, key%1001
		if y2 != y || x2 == x {
			continue
		}
		distance := x2 - x
		if distance < 0 {
			distance = -distance
		}
		total += int64(horizontal) * int64(design.frequency(x, y+distance)) * int64(design.frequency(x2, y+distance))
		total += int64(horizontal) * int64(design.frequency(x, y-distance)) * int64(design.frequency(x2, y-distance))
	}
	return int(total)
}

func (design *DetectSquares) frequency(x, y int) int {
	if y < 0 || y > 1000 {
		return 0
	}
	return design.frequencies[encode(x, y)]
}

func encode(x, y int) int {
	return x*1001 + y
}
