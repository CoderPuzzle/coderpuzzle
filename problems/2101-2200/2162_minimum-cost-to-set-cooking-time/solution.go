import "math"

func minCostSetTime(startAt int, moveCost int, pushCost int, targetSeconds int) int {
	// Only minutes in [0, 99] whose implied seconds target - 60*minutes
	// also land in [0, 99] are settable at all; cost each survivor by
	// walking its digit sequence after normalization trims the zeroes
	// the microwave would otherwise prepend.
	best := math.MaxInt
	for minutes := 0; minutes <= 99; minutes++ {
		seconds := targetSeconds - 60*minutes
		if seconds < 0 || seconds > 99 {
			continue
		}
		digits := [4]int{minutes / 10, minutes % 10, seconds / 10, seconds % 10}
		start, cost, finger := 0, 0, startAt
		for start < 4 && digits[start] == 0 {
			start++
		}
		for _, digit := range digits[start:] {
			if digit != finger {
				cost += moveCost
				finger = digit
			}
			cost += pushCost
		}
		if cost < best {
			best = cost
		}
	}
	return best
}
