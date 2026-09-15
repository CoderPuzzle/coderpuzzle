import "math"

func angleClock(hour int, minutes int) float64 {
	// Hour hand: 30 degrees per hour plus 0.5 per minute; minute hand:
	// 6 per minute. The two vertical angles sum to 360, so fold.
	hourPos := 30*float64(hour%12) + 0.5*float64(minutes)
	minutePos := 6 * float64(minutes)
	diff := math.Abs(hourPos - minutePos)
	return math.Min(diff, 360-diff)
}
