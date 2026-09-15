import "math"

func getMinDistSum(positions [][]int) float64 {
	n := float64(len(positions))
	// start from the centroid, a reasonable first guess for the median
	x, y := 0.0, 0.0
	for _, p := range positions {
		x += float64(p[0])
		y += float64(p[1])
	}
	x, y = x/n, y/n
	const eps = 1e-9 // keeps the weight finite if the guess lands on a customer
	for it := 0; it < 300; it++ {
		numX, numY, weightSum := 0.0, 0.0, 0.0
		for _, p := range positions {
			px, py := float64(p[0]), float64(p[1])
			distance := math.Hypot(x-px, y-py) + eps
			weight := 1.0 / distance
			numX += weight * px
			numY += weight * py
			weightSum += weight
		}
		x, y = numX/weightSum, numY/weightSum
	}
	total := 0.0
	for _, p := range positions {
		total += math.Hypot(x-float64(p[0]), y-float64(p[1]))
	}
	return total
}
