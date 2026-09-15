func equalizeWater(buckets []int, loss int) float64 {
	high := 0.0
	for _, water := range buckets {
		if float64(water) > high {
			high = float64(water)
		}
	}
	low := 0.0
	retained := float64(100-loss) / 100.0
	for iteration := 0; iteration < 100; iteration++ {
		middle := (low + high) / 2.0
		needed, available := 0.0, 0.0
		for _, water := range buckets {
			if float64(water) < middle {
				needed += middle - float64(water)
			} else {
				available += float64(water) - middle
			}
		}
		if available*retained >= needed {
			low = middle
		} else {
			high = middle
		}
	}
	return low
}
