import "math"

func numPoints(darts [][]int, r int) int {
	n := len(darts)
	best := 1
	r2 := float64(r) * float64(r)
	eps := 1e-7
	countAt := func(cx, cy float64) int {
		count := 0
		for _, dart := range darts {
			dx := float64(dart[0]) - cx
			dy := float64(dart[1]) - cy
			if dx*dx+dy*dy <= r2+eps {
				count++
			}
		}
		return count
	}
	for i := 0; i < n; i++ {
		if c := countAt(float64(darts[i][0]), float64(darts[i][1])); c > best {
			best = c
		}
	}
	for i := 0; i < n; i++ {
		x1, y1 := float64(darts[i][0]), float64(darts[i][1])
		for j := i + 1; j < n; j++ {
			x2, y2 := float64(darts[j][0]), float64(darts[j][1])
			dx, dy := x2-x1, y2-y1
			d2 := dx*dx + dy*dy
			if d2 == 0 || d2 > 4*r2 {
				continue
			}
			h2 := r2 - d2/4.0
			if h2 < 0 {
				h2 = 0
			}
			scale := math.Sqrt(h2 / d2)
			mx, my := (x1+x2)/2.0, (y1+y2)/2.0
			for _, factor := range []float64{1.0, -1.0} {
				if c := countAt(mx+factor*scale*-dy, my+factor*scale*dx); c > best {
					best = c
				}
			}
		}
	}
	return best
}
