// The nearest point of an axis-aligned box to any point is found
// coordinate-wise: clamp each coordinate into the box's interval.
func checkOverlap(radius int, xCenter int, yCenter int, x1 int, y1 int, x2 int, y2 int) bool {
	nearestX := xCenter
	if nearestX < x1 {
		nearestX = x1
	}
	if nearestX > x2 {
		nearestX = x2
	}
	nearestY := yCenter
	if nearestY < y1 {
		nearestY = y1
	}
	if nearestY > y2 {
		nearestY = y2
	}
	dx := xCenter - nearestX
	dy := yCenter - nearestY
	return dx*dx+dy*dy <= radius*radius
}
