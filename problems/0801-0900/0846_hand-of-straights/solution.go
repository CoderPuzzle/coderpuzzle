import "sort"

func isNStraightHand(hand []int, groupSize int) bool {
	// A divisible hand must be a multiple of groupSize long.
	if len(hand)%groupSize != 0 {
		return false
	}
	counts := make(map[int]int)
	for _, v := range hand {
		counts[v]++
	}
	values := make([]int, 0, len(counts))
	for v := range counts {
		values = append(values, v)
	}
	sort.Ints(values)
	// Walk distinct values in sorted order: the smallest remaining
	// value must start its groups — nothing smaller exists to
	// extend downward.
	for _, value := range values {
		need := counts[value]
		if need > 0 {
			// Each of the next groupSize-1 values must supply at
			// least `need` cards; subtracting in bulk keeps this to
			// one pass per starting value.
			for nv := value; nv < value+groupSize; nv++ {
				if counts[nv] < need {
					return false
				}
				counts[nv] -= need
			}
		}
	}
	// Exhausted values reach the loop at count 0 and skip for
	// free; consuming the smallest fully makes the rest a smaller
	// instance of the same problem.
	return true
}
