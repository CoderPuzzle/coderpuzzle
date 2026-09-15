// The region is connected, so its projection on each axis is one contiguous
// range: every row between the topmost and bottommost black row holds a black
// pixel, and likewise for columns. Each "does this line hold a black pixel"
// predicate therefore flips exactly once around the known black pixel (x, y),
// so four binary searches outward from (x, y) find the bounds.
func minArea(image [][]string, x int, y int) int {
	hasBlackRow := func(r int) bool {
		for _, cell := range image[r] {
			if cell == "1" {
				return true
			}
		}
		return false
	}
	hasBlackCol := func(c int) bool {
		for _, row := range image {
			if row[c] == "1" {
				return true
			}
		}
		return false
	}
	// Each bound is a binary search outward from (x, y): the line through
	// (x, y) itself is black, so every window probed still brackets it.
	top := firstBlack(0, x, hasBlackRow)
	bottom := lastBlack(x, len(image)-1, hasBlackRow)
	left := firstBlack(0, y, hasBlackCol)
	right := lastBlack(y, len(image[0])-1, hasBlackCol)
	// The smallest enclosing rectangle is the cross of the two spans.
	return (bottom - top + 1) * (right - left + 1)
}

// First line in [lo, hi] that is black; has(hi) always holds because the
// range brackets the line through (x, y) itself.
func firstBlack(lo, hi int, has func(int) bool) int {
	for lo < hi {
		mid := (lo + hi) / 2
		if has(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}

// Last line in [lo, hi] that is black; the +1 in the midpoint keeps the
// window shrinking when only two lines remain.
func lastBlack(lo, hi int, has func(int) bool) int {
	for lo < hi {
		mid := (lo + hi + 1) / 2
		if has(mid) {
			lo = mid
		} else {
			hi = mid - 1
		}
	}
	return lo
}
