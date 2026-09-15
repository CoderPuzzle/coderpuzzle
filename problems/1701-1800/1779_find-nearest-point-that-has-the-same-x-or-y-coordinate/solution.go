import "math"

// A valid point already agrees with one coordinate, so one of the two gaps in
// the Manhattan distance is always zero. The comparison is a strict
// improvement only: an equal distance keeps the earlier index, which is the
// statement's tie rule.
func nearestValidPoint(x int, y int, points [][]int) int {
	bestDist := math.MaxInt
	bestIndex := -1
	for i, point := range points {
		a, b := point[0], point[1]
		if a == x || b == y {
			dist := abs(a-x) + abs(b-y)
			if dist < bestDist {
				bestDist = dist
				bestIndex = i
			}
		}
	}
	return bestIndex
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
