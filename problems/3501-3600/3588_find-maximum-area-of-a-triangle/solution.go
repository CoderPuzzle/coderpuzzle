// A valid triangle needs a horizontal or vertical side. On a
// horizontal line y the widest base is the x-span of that line, and
// the tallest apex is the global top or bottom point, whichever lies
// off the line — so every line contributes two O(1) candidates once
// points are grouped. Vertical sides mirror this. 2 * area reaches
// 2 * (10^6)^2, so int64 math is required.
func maxArea(coords [][]int) int64 {
	byY := make(map[int][]int)
	byX := make(map[int][]int)
	for _, p := range coords {
		byY[p[1]] = append(byY[p[1]], p[0])
		byX[p[0]] = append(byX[p[0]], p[1])
	}
	gxmin, gxmax := 1<<31-1, -1<<31
	gymin, gymax := 1<<31-1, -1<<31
	for x := range byX {
		if x < gxmin {
			gxmin = x
		}
		if x > gxmax {
			gxmax = x
		}
	}
	for y := range byY {
		if y < gymin {
			gymin = y
		}
		if y > gymax {
			gymax = y
		}
	}
	best := int64(-1)
	for y, row := range byY {
		if len(row) < 2 {
			continue
		}
		lo, hi := row[0], row[0]
		for _, v := range row {
			if v < lo {
				lo = v
			}
			if v > hi {
				hi = v
			}
		}
		if gymax != y {
			if c := int64(hi-lo) * int64(gymax-y); c > best {
				best = c
			}
		}
		if gymin != y {
			if c := int64(hi-lo) * int64(y-gymin); c > best {
				best = c
			}
		}
	}
	for x, col := range byX {
		if len(col) < 2 {
			continue
		}
		lo, hi := col[0], col[0]
		for _, v := range col {
			if v < lo {
				lo = v
			}
			if v > hi {
				hi = v
			}
		}
		if gxmax != x {
			if c := int64(hi-lo) * int64(gxmax-x); c > best {
				best = c
			}
		}
		if gxmin != x {
			if c := int64(hi-lo) * int64(x-gxmin); c > best {
				best = c
			}
		}
	}
	return best
}
