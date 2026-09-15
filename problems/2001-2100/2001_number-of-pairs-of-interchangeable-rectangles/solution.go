func interchangeableRectangles(rectangles [][]int) int64 {
	type ratio struct {
		width  int
		height int
	}

	var total int64
	counts := make(map[ratio]int64, len(rectangles))
	for _, rectangle := range rectangles {
		divisor := gcd(rectangle[0], rectangle[1])
		key := ratio{rectangle[0] / divisor, rectangle[1] / divisor}
		total += counts[key]
		counts[key]++
	}
	return total
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
