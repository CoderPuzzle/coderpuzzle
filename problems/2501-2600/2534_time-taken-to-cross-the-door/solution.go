func timeTaken(arrival []int, state []int) []int {
	// Two FIFO queues fed by an arrival pointer (equal arrival seconds
	// enter index order automatically). prevDir carries the direction of
	// the previous second: while both sides compete the door keeps its
	// streak, and exits win only when the door has just been idle.
	n := len(arrival)
	var enterQ, exitQ []int
	ans := make([]int, n)
	i := 0
	t := 0
	prevDir := -1 // -1 unused, 0 entering, 1 exiting
	for done := 0; done < n; {
		for i < n && arrival[i] <= t {
			if state[i] == 1 {
				exitQ = append(exitQ, i)
			} else {
				enterQ = append(enterQ, i)
			}
			i++
		}
		if len(enterQ) == 0 && len(exitQ) == 0 {
			t = arrival[i] // jump the clock; idle breaks any streak
			prevDir = -1
			continue
		}
		hasEnter := len(enterQ) > 0
		hasExit := len(exitQ) > 0
		d := 1
		if hasEnter && hasExit {
			if prevDir != -1 {
				d = prevDir
			}
		} else if !hasExit {
			d = 0
		}
		if d == 1 {
			ans[exitQ[0]] = t
			exitQ = exitQ[1:]
		} else {
			ans[enterQ[0]] = t
			enterQ = enterQ[1:]
		}
		prevDir = d
		done++
		t++
	}
	return ans
}
