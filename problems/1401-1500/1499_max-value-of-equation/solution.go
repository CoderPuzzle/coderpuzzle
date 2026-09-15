import "math"

func findMaxValueOfEquation(points [][]int, k int) int {
	n := len(points)
	// x is sorted increasing, so for i < j the equation value is
	// yj + xj + (yi - xi): the best partner maximizes the key y - x,
	// turning this into a sliding-window max over that key (deque kept
	// with y - x strictly decreasing, front = best candidate)
	dq := make([]int, n)
	head, tail := 0, 0
	best := int64(math.MinInt64)
	for j := 0; j < n; j++ {
		xj, yj := int64(points[j][0]), int64(points[j][1])
		// drop stale front: x only grows, so anything beyond k behind
		// the current j is beyond k for every later j too
		for head < tail && xj-int64(points[dq[head]][0]) > int64(k) {
			head++
		}
		if head < tail {
			xi, yi := int64(points[dq[head]][0]), int64(points[dq[head]][1])
			value := yj + yi + xj - xi
			if value > best {
				best = value
			}
		}
		// a back entry with key <= newcomer's can never win a future j;
		// popping ties is safe — the newer index has larger x, so it
		// stays inside the k-window at least as long
		for head < tail && int64(points[dq[tail-1]][1])-int64(points[dq[tail-1]][0]) <= yj-xj {
			tail--
		}
		dq[tail] = j
		tail++
	}
	return int(best)
}
