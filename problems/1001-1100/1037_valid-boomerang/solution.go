// Cross product of (p2 - p1) and (p3 - p1); zero exactly when the two
// edge vectors are parallel, which also covers any duplicate point (a
// zero vector is parallel to everything).
func isBoomerang(points [][]int) bool {
	x1, y1 := int64(points[0][0]), int64(points[0][1])
	x2, y2 := int64(points[1][0]), int64(points[1][1])
	x3, y3 := int64(points[2][0]), int64(points[2][1])
	cross := (x2-x1)*(y3-y1) - (y2-y1)*(x3-x1)
	return cross != 0
}
