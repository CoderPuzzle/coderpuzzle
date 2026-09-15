func minGroupsForValidAssignment(balls []int) int {
	// Some box size s must make every box hold s or s + 1 balls, and the
	// value with the fewest copies bounds s by its frequency. For each
	// candidate s, pack each frequency f into f / (s + 1) boxes when it
	// divides evenly, one more box when the remainder can be absorbed by
	// shrinking that many full boxes, or fail; the cheapest feasible s
	// wins.
	counts := map[int]int{}
	for _, ball := range balls {
		counts[ball]++
	}
	freqs := make([]int, 0, len(counts))
	smallest := len(balls)
	for _, f := range counts {
		freqs = append(freqs, f)
		if f < smallest {
			smallest = f
		}
	}
	best := len(balls)
	for size := 1; size <= smallest; size++ {
		total, ok := 0, true
		for _, f := range freqs {
			big, rest := f/(size+1), f%(size+1)
			if rest != 0 {
				if size-rest > big {
					ok = false
					break
				}
				total++
			}
			total += big
		}
		if ok && total < best {
			best = total
		}
	}
	return best
}
