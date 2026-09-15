func average(salary []int64) float64 {
	var total int64
	low := salary[0]
	high := salary[0]
	for _, value := range salary {
		total += value
		if value < low {
			low = value
		}
		if value > high {
			high = value
		}
	}
	return float64(total-low-high) / float64(len(salary)-2)
}
