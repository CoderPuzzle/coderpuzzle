import "sort"

func findMaxVal(n int, restrictions [][]int, diff []int) int {
	const inf = int64(1) << 62

	// Upper bound per position from left-propagated caps and
	// restrictions. Position 0 carries the sequence's own anchor:
	// a[0] = 0, so no value can exceed what diff allows away from it.
	cap := make([]int64, n)
	for i := range cap {
		cap[i] = inf
	}
	cap[0] = 0
	sort.Slice(restrictions, func(x, y int) bool {
		return restrictions[x][0] < restrictions[y][0]
	})
	for _, restriction := range restrictions {
		idx, maxVal := restriction[0], restriction[1]
		if int64(maxVal) < cap[idx] {
			cap[idx] = int64(maxVal)
		}
	}
	for i := 1; i < n; i++ {
		if cap[i-1]+int64(diff[i-1]) < cap[i] {
			cap[i] = cap[i-1] + int64(diff[i-1])
		}
	}

	// Right pass mirrors it: a tight bound at j also caps every
	// position i < j to cap[j] + sum(diff[i..j-1]).
	for i := n - 2; i >= 0; i-- {
		if cap[i+1]+int64(diff[i]) < cap[i] {
			cap[i] = cap[i+1] + int64(diff[i])
		}
	}

	// The optimal sequence attains every bound simultaneously, so the
	// largest value in it is the largest bound.
	var answer int64
	for i := 0; i < n; i++ {
		if cap[i] > answer {
			answer = cap[i]
		}
	}
	return int(answer)
}
