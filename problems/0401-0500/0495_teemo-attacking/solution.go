// Every attack opens a poison window of `duration` seconds, but a fresh
// attack inside the still-open window resets the timer, so attack i keeps
// only the part of its window that runs out before the next attack:
// min(duration, gap). The final attack is never followed by another, so it
// always contributes its full duration.
//
// The running total is the union of the windows so far, which never exceeds
// t_max + duration <= 2*10^7, and Go's int is 64-bit on every judge
// platform anyway, so the accumulation is exact.
func findPoisonedDuration(timeSeries []int, duration int) int {
	total := 0
	for i := 1; i < len(timeSeries); i++ {
		gap := timeSeries[i] - timeSeries[i-1]
		if gap < duration {
			total += gap
		} else {
			total += duration
		}
	}
	return total + duration
}
