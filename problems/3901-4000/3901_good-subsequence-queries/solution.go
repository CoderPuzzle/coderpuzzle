func countGoodSubseq(nums []int, p int, queries [][]int) int {
	const limit = 50000
	n := len(nums)
	smallest := make([]int, limit+1)
	for i := range smallest {
		smallest[i] = i
	}
	for value := 2; value*value <= limit; value++ {
		if smallest[value] == value {
			for multiple := value * value; multiple <= limit; multiple += value {
				if smallest[multiple] == multiple {
					smallest[multiple] = value
				}
			}
		}
	}
	factors := func(value int) []int {
		result := []int{}
		for value > 1 {
			prime := smallest[value]
			result = append(result, prime)
			for value%prime == 0 {
				value /= prime
			}
		}
		return result
	}

	counts := make([]int, limit+1)
	coveredXor := make([]int, limit+1)
	histogram := make([]int, n+1)
	forbidden := make([]int, n)
	allXor, forbiddenDistinct, active := 0, 0, 0
	for i := 0; i < n; i++ {
		allXor ^= i
	}
	adjust := func(prime, index, delta int) {
		count := counts[prime]
		if count == n-1 {
			missing := allXor ^ coveredXor[prime]
			forbidden[missing]--
			if forbidden[missing] == 0 {
				forbiddenDistinct--
			}
		}
		if count > 0 {
			histogram[count]--
		}
		counts[prime] += delta
		coveredXor[prime] ^= index
		count = counts[prime]
		if count > 0 {
			histogram[count]++
		}
		if count == n-1 {
			missing := allXor ^ coveredXor[prime]
			if forbidden[missing] == 0 {
				forbiddenDistinct++
			}
			forbidden[missing]++
		}
	}
	for i, value := range nums {
		if value%p == 0 {
			active++
			for _, prime := range factors(value / p) {
				adjust(prime, i, 1)
			}
		}
	}
	answer := 0
	for _, query := range queries {
		index, value := query[0], query[1]
		if nums[index]%p == 0 {
			for _, prime := range factors(nums[index] / p) {
				adjust(prime, index, -1)
			}
			active--
		}
		nums[index] = value
		if value%p == 0 {
			active++
			for _, prime := range factors(value / p) {
				adjust(prime, index, 1)
			}
		}
		if active > 0 && ((active < n && histogram[active] == 0) ||
			(active == n && histogram[n] == 0 && forbiddenDistinct < n)) {
			answer++
		}
	}
	return answer
}
