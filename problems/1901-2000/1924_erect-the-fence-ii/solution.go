import "math"

func circleInside(c [3]float64, x, y float64) bool {
	dx := x - c[0]
	dy := y - c[1]
	return dx*dx+dy*dy <= c[2]+1e-7
}

// Circle with the two points as diameter: midpoint center, squared radius = d^2/4.
func circleFrom2(ax, ay, bx, by float64) [3]float64 {
	cx := (ax + bx) / 2.0
	cy := (ay + by) / 2.0
	dx := ax - bx
	dy := ay - by
	return [3]float64{cx, cy, (dx*dx + dy*dy) / 4.0}
}

func circleFrom3(ax, ay, bx, by, cx, cy float64) [3]float64 {
	// Zero determinant = collinear, no circumcircle; the best two-point
	// circle among the pairs is the correct enclosing circle.
	d := 2.0 * (ax*(by-cy) + bx*(cy-ay) + cx*(ay-by))
	if d == 0.0 {
		best := circleFrom2(ax, ay, bx, by)
		cand := circleFrom2(ax, ay, cx, cy)
		if cand[2] < best[2] {
			best = cand
		}
		cand = circleFrom2(bx, by, cx, cy)
		if cand[2] < best[2] {
			best = cand
		}
		return best
	}
	// Circumcenter via the perpendicular-bisector linear system.
	aa := ax*ax + ay*ay
	bb := bx*bx + by*by
	cc := cx*cx + cy*cy
	ux := (aa*(by-cy) + bb*(cy-ay) + cc*(ay-by)) / d
	uy := (aa*(cx-bx) + bb*(ax-cx) + cc*(bx-ax)) / d
	dx := ax - ux
	dy := ay - uy
	return [3]float64{ux, uy, dx*dx + dy*dy}
}

func outerTrees(trees [][]int) []float64 {
	// Translate by the first tree before converting to floats: small
	// intermediate magnitudes protect the 1e-5 judge tolerance.
	n := len(trees)
	ox, oy := float64(trees[0][0]), float64(trees[0][1])
	xs := make([]float64, n)
	ys := make([]float64, n)
	for i, p := range trees {
		xs[i] = float64(p[0]) - ox
		ys[i] = float64(p[1]) - oy
	}
	// Welzl's argument: a point outside the current circle must lie ON the
	// border of the corrected circle — fix i and rebuild one level deeper
	// (j escaping fixes a second border point, k escaping fixes all three).
	circle := [3]float64{xs[0], ys[0], 0.0}
	for i := 1; i < n; i++ {
		if circleInside(circle, xs[i], ys[i]) {
			continue
		}
		circle = [3]float64{xs[i], ys[i], 0.0}
		for j := 0; j < i; j++ {
			if circleInside(circle, xs[j], ys[j]) {
				continue
			}
			circle = circleFrom2(xs[i], ys[i], xs[j], ys[j])
			for k := 0; k < j; k++ {
				if circleInside(circle, xs[k], ys[k]) {
					continue
				}
				circle = circleFrom3(xs[i], ys[i], xs[j], ys[j], xs[k], ys[k])
			}
		}
	}
	return []float64{circle[0] + ox, circle[1] + oy, math.Sqrt(circle[2])}
}
