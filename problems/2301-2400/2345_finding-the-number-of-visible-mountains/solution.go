import "sort"

func visibleMountains(peaks [][]int) int {
	// Mountain (x, y) contains peak (a, b) exactly when |a - x| <= y - b:
	// the peak sits inside or on the slopes. Sorting by x ascending (ties
	// by y descending) puts every potential coverer no later, so a
	// monotonic stack settles everything in one pass. Duplicated peaks are
	// invisible but still hide others, so they stay on the stack for their
	// covering effect and are only excluded from the final count.
	sort.Slice(peaks, func(i, j int) bool {
		if peaks[i][0] != peaks[j][0] {
			return peaks[i][0] < peaks[j][0]
		}
		return peaks[i][1] > peaks[j][1]
	})
	type entry struct{ x, y, counted int }
	var stack []entry
	for i := 0; i < len(peaks); {
		j := i
		for j < len(peaks) && peaks[j][0] == peaks[i][0] && peaks[j][1] == peaks[i][1] {
			j++
		}
		duplicated := j-i > 1
		x, y := peaks[i][0], peaks[i][1]
		for len(stack) > 0 && abs(stack[len(stack)-1].x-x) <= y-stack[len(stack)-1].y {
			stack = stack[:len(stack)-1]
		}
		covered := false
		if len(stack) > 0 {
			top := stack[len(stack)-1]
			covered = abs(x-top.x) <= top.y-y
		}
		counted := 0
		if !duplicated {
			counted = 1
		}
		if !covered {
			stack = append(stack, entry{x, y, counted})
		}
		i = j
	}
	visible := 0
	for _, e := range stack {
		visible += e.counted
	}
	return visible
}

func abs(v int) int {
	if v < 0 {
		return -v
	}
	return v
}
