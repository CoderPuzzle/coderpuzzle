import "math"

// The best width is the largest divisor of area at or below its square root:
// every factorization pairs a divisor above the root with one below it, a
// larger W means a smaller L = area / W, and requirement 2 pins the answer to
// the below-root half — so the widest such W minimizes L - W while keeping
// L >= W. math.Sqrt is a float64, so settle the floor exactly first: starting
// below the root could skip a square's [s, s] pair, and starting above it
// could accept W > L (area 12 at width 4 gives [3, 4]).
func constructRectangle(area int) []int {
	width := int(math.Sqrt(float64(area)))
	for width*width > area {
		width--
	}
	for (width+1)*(width+1) <= area {
		width++
	}
	for area%width != 0 {
		width--
	}
	return []int{area / width, width}
}
