func maxPairStrength(nums []int) int64 {
	// Fewer than two million pairs at n <= 2000, so every distinct index
	// pair is tried directly: g = gcd(a, b), strength = a * b / g^2. The
	// division is exact because g divides both factors, and equal values
	// collapse to 1, which is why [3,3] scores 1. Widen to int64 before
	// multiplying: two coprime values near the bound reach just under
	// 1e10, past what an int32 can hold.
	best := int64(0)
	for i := 0; i < len(nums); i++ {
		for j := i + 1; j < len(nums); j++ {
			g := int64(gcd(nums[i], nums[j]))
			s := int64(nums[i]) * int64(nums[j]) / (g * g)
			if s > best {
				best = s
			}
		}
	}
	return best
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
