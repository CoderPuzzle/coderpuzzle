import "sort"

// At day t a variant reaches exactly the L1 ball of radius t around its
// origin, so the answer is min over every lattice point p of the k-th smallest
// L1 distance from p to the n origins. Any point outside the bounding box can
// be projected onto the box, which only shrinks every distance, so the
// minimizer lies inside it. With coordinates bounded by 100 the box has at most
// 100*100 points and n <= 50, so sorting the n distances per point is cheap.
func minDayskVariants(points [][]int, k int) int {
	minX, maxX := 1<<30, -1<<30
	minY, maxY := 1<<30, -1<<30
	for _, p := range points {
		if p[0] < minX {
			minX = p[0]
		}
		if p[0] > maxX {
			maxX = p[0]
		}
		if p[1] < minY {
			minY = p[1]
		}
		if p[1] > maxY {
			maxY = p[1]
		}
	}
	best := 1 << 30
	for x := minX; x <= maxX; x++ {
		for y := minY; y <= maxY; y++ {
			dists := make([]int, len(points))
			for i, p := range points {
				d := abs(x-p[0]) + abs(y-p[1])
				dists[i] = d
			}
			sort.Ints(dists)
			if dists[k-1] < best {
				best = dists[k-1]
			}
		}
	}
	return best
}

func abs(v int) int {
	if v < 0 {
		return -v
	}
	return v
}
