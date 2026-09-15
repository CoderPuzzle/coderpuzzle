import "sort"

func maxArea(height int, positions []int, directions string) int64 {
	// The total moves each second by (#up - #down); that balance only
	// changes at critical times when a piston lands on an end and turns
	// around. Between critical times the total runs along a straight
	// line, so its peak sits at t = 0 or at some critical time.
	events := map[int]int{}
	balance := 0
	for i, p := range positions {
		var goingUp bool
		if p == 0 {
			goingUp = true
		} else if p == height {
			goingUp = false
		} else {
			goingUp = directions[i] == 'U'
		}
		first := height - p
		if !goingUp {
			first = p
		}
		if goingUp {
			// Landing on the top flips a piston downward.
			events[first] -= 2
			balance++
			if first < height { // second landing stays inside period 2h
				events[first+height] += 2
			}
		} else {
			// Landing on the floor flips a piston upward.
			events[first] += 2
			balance--
			if first < height {
				events[first+height] -= 2
			}
		}
	}

	times := make([]int, 0, len(events))
	for t := range events {
		times = append(times, t)
	}
	sort.Ints(times)

	// Totals pass 32 bits near n * height = 10^11; the sweep runs in
	// int64 throughout.
	total := int64(0)
	for _, p := range positions {
		total += int64(p)
	}
	best := total
	prev := 0
	for _, t := range times {
		total += int64(balance) * int64(t-prev)
		if total > best {
			best = total
		}
		balance += events[t]
		prev = t
	}
	return best
}
