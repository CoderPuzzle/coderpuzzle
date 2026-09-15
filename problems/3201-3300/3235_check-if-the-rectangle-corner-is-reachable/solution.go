func canReachCorner(xCorner int, yCorner int, circles [][]int) bool {
	// Nodes 0..n-1 are the circles, then the top, right, bottom, and left
	// edges of the rectangle. Touching circles merge into obstacle blobs,
	// and a blob pinned to two edges blocks the corner-to-corner path
	// exactly for the pairs left-right, left-bottom, right-top, and
	// top-bottom: spanning walls cut the rectangle in half, while the
	// other two pairs fence off the start and goal corners themselves.
	// A circle covering a corner touches both adjacent edges at once.
	n := len(circles)
	top, right, bottom, left := n, n+1, n+2, n+3
	parent := make([]int, n+4)
	for i := range parent {
		parent[i] = i
	}
	var find func(node int) int
	find = func(node int) int {
		for parent[node] != node {
			parent[node] = parent[parent[node]]
			node = parent[node]
		}
		return node
	}
	unite := func(a, b int) {
		parent[find(a)] = find(b)
	}
	// Coordinates reach 1e9, so squared distances leave 32-bit range; the
	// geometry below runs in int64, exact for those products.
	meetsEdge := func(cx, cy, radius, fixed int64, vertical bool) bool {
		var px, py int64
		if vertical {
			px = fixed
			py = min64(max64(cy, 0), int64(yCorner))
		} else {
			px = min64(max64(cx, 0), int64(xCorner))
			py = fixed
		}
		dx, dy := cx-px, cy-py
		return dx*dx+dy*dy <= radius*radius
	}
	for i, circle := range circles {
		cx, cy := int64(circle[0]), int64(circle[1])
		radius := int64(circle[2])
		if meetsEdge(cx, cy, radius, int64(yCorner), false) {
			unite(top, i)
		}
		if meetsEdge(cx, cy, radius, int64(xCorner), true) {
			unite(right, i)
		}
		if meetsEdge(cx, cy, radius, 0, false) {
			unite(bottom, i)
		}
		if meetsEdge(cx, cy, radius, 0, true) {
			unite(left, i)
		}
		for j := 0; j < i; j++ {
			dx, dy := cx-int64(circles[j][0]), cy-int64(circles[j][1])
			rr := radius + int64(circles[j][2])
			if dx*dx+dy*dy <= rr*rr {
				unite(i, j)
			}
		}
	}
	return find(left) != find(right) &&
		find(left) != find(bottom) &&
		find(right) != find(top) &&
		find(top) != find(bottom)
}

func max64(a, b int64) int64 {
	if a > b {
		return a
	}
	return b
}

func min64(a, b int64) int64 {
	if a < b {
		return a
	}
	return b
}
