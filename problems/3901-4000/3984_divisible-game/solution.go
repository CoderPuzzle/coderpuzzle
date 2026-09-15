func divisibleGame(nums []int) int {
	const mod int64 = 1000000007
	candidates := map[int]bool{2: true}
	for _, value := range nums {
		for divisor := 2; divisor*divisor <= value; divisor++ {
			if value%divisor == 0 {
				candidates[divisor] = true
				candidates[value/divisor] = true
			}
		}
		if value > 1 {
			candidates[value] = true
		}
	}

	bestScore := int64(-1 << 62)
	bestK := 0
	for k := range candidates {
		score := int64(-1 << 62)
		current := int64(0)
		for _, value := range nums {
			transformed := int64(value)
			if value%k != 0 {
				transformed = -transformed
			}
			if transformed > current+transformed {
				current = transformed
			} else {
				current += transformed
			}
			if current > score {
				score = current
			}
		}
		if score > bestScore || (score == bestScore && k < bestK) {
			bestScore = score
			bestK = k
		}
	}
	answer := ((bestScore%mod + mod) % mod) * int64(bestK) % mod
	return int(answer)
}
