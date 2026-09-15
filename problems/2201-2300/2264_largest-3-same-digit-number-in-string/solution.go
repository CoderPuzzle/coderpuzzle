func largestGoodInteger(num string) string {
	best := ""
	for i := 2; i < len(num); i++ {
		if num[i] == num[i-1] && num[i] == num[i-2] {
			candidate := num[i-2 : i+1]
			if candidate > best {
				best = candidate
			}
		}
	}
	return best
}
