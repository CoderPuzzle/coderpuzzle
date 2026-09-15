func diagonalPrime(nums [][]int) int {
	// Only the two diagonals can contribute, so walk both index legs
	// once and keep the largest value that survives a primality test.
	// Trial division by 2 and then odd factors up to sqrt(value) caps
	// each check near 2000 steps, since values never exceed 4*10^6.
	isPrime := func(value int) bool {
		if value < 2 {
			return false
		}
		if value%2 == 0 {
			return value == 2
		}
		for factor := 3; factor*factor <= value; factor += 2 {
			if value%factor == 0 {
				return false
			}
		}
		return true
	}
	best := 0
	size := len(nums)
	for i := 0; i < size; i++ {
		if primary := nums[i][i]; isPrime(primary) && primary > best {
			best = primary
		}
		if secondary := nums[i][size-1-i]; isPrime(secondary) && secondary > best {
			best = secondary
		}
	}
	return best
}
