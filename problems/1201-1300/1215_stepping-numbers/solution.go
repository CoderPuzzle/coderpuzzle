func countSteppingNumbers(low int64, high int64) []int64 {
	// Seed with every one-digit number, then extend by one digit: the
	// successor of a number ending in d is built from d-1 and d+1 only.
	out := []int64{}
	if low <= 0 && 0 <= high {
		out = append(out, 0)
	}
	queue := make([]int64, 0, 64)
	for seed := int64(1); seed <= 9; seed++ {
		queue = append(queue, seed)
	}
	for head := 0; head < len(queue); head++ {
		current := queue[head]
		if current > high {
			continue
		}
		if current >= low {
			out = append(out, current)
		}
		last := current % 10
		for _, digit := range []int64{last - 1, last + 1} {
			if digit >= 0 && digit <= 9 {
				queue = append(queue, current*10+digit)
			}
		}
	}
	return out
}
