import "math"

func earliestFinishTime(landStartTime []int, landDuration []int, waterStartTime []int, waterDuration []int) int {
	// Delaying a boarding past an opening never helps, and an earlier first
	// finish never pushes the second boarding later: the second leg starts
	// at max(first finish, second opening). Price both orders for every
	// pair and keep the cheapest.
	best := math.MaxInt
	for i := range landStartTime {
		for j := range waterStartTime {
			landDone := landStartTime[i] + landDuration[i]
			waterDone := waterStartTime[j] + waterDuration[j]
			landFirst := max(landDone, waterStartTime[j]) + waterDuration[j]
			waterFirst := max(waterDone, landStartTime[i]) + landDuration[i]
			best = min(best, min(landFirst, waterFirst))
		}
	}
	return best
}
