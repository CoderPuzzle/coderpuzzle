func checkStraightLine(coordinates [][]int) bool {
	x1, y1 := coordinates[0][0], coordinates[0][1]
	x2, y2 := coordinates[1][0], coordinates[1][1]
	// Cross product against the first two points: zero means the vector is
	// parallel to the fixed direction, vertical lines included.
	for _, point := range coordinates[2:] {
		x, y := point[0], point[1]
		if (x-x1)*(y2-y1) != (y-y1)*(x2-x1) {
			return false
		}
	}
	return true
}
