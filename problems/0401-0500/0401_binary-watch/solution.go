import (
	"fmt"
	"math/bits"
)

// Hours outer, minutes inner: the walk emits the pinned chronological order
// directly, with no post-sort.
func readBinaryWatch(turnedOn int) []string {
	times := make([]string, 0, 12*60)
	for hour := 0; hour < 12; hour++ {
		for minute := 0; minute < 60; minute++ {
			// A time shows when its lit hour LEDs plus lit minute LEDs equal
			// turnedOn; each lit count is just a popcount.
			if bits.OnesCount(uint(hour))+bits.OnesCount(uint(minute)) == turnedOn {
				// "%d:%02d": no hour leading zero, always two minute digits.
				times = append(times, fmt.Sprintf("%d:%02d", hour, minute))
			}
		}
	}
	return times
}
