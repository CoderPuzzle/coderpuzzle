func lastInteger(n int64) int64 {
	start, step, remaining := int64(1), int64(1), n
	fromLeft := true
	for remaining > 1 {
		if !fromLeft && remaining%2 == 0 {
			start += step
		}
		remaining = (remaining + 1) / 2
		step *= 2
		fromLeft = !fromLeft
	}
	return start
}
