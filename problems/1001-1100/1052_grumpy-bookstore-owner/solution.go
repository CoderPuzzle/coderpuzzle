func maxSatisfied(customers []int, grumpy []int, minutes int) int {
	base := 0
	for i := range customers {
		if grumpy[i] == 0 {
			base += customers[i]
		}
	}

	window := 0
	for i := 0; i < minutes; i++ {
		if grumpy[i] == 1 {
			window += customers[i]
		}
	}
	best := window
	for i := minutes; i < len(customers); i++ {
		if grumpy[i] == 1 {
			window += customers[i]
		}
		if grumpy[i-minutes] == 1 {
			window -= customers[i-minutes]
		}
		if window > best {
			best = window
		}
	}

	return base + best
}
