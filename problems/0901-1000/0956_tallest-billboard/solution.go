// DP over the support-height difference. best[d] is the tallest left support
// reachable with left - right == d; unreachable differences hold -1. Each rod
// is welded left, welded right, or discarded.
func tallestBillboard(rods []int) int {
	total := 0
	for _, rod := range rods {
		total += rod
	}
	span := 2*total + 1
	best := make([]int, span)
	for i := range best {
		best[i] = -1
	}
	// index d + total keeps every difference non-negative
	best[total] = 0
	for _, rod := range rods {
		nxt := make([]int, span)
		for i := range nxt {
			nxt[i] = -1
		}
		for idx, left := range best {
			if left < 0 {
				continue
			}
			if left > nxt[idx] {
				nxt[idx] = left // discard the rod
			}
			if left+rod > nxt[idx+rod] {
				nxt[idx+rod] = left + rod // weld onto the left support
			}
			if left > nxt[idx-rod] {
				nxt[idx-rod] = left // weld onto the right support
			}
		}
		best = nxt
	}
	// difference 0 means equal supports; its left height is the answer.
	return best[total]
}
