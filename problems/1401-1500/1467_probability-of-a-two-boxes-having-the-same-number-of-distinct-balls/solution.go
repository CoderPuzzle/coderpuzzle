func getProbability(balls []int) float64 {
	total := 0
	for _, count := range balls {
		total += count
	}
	half := total / 2
	denominator := binomial(total, half)
	numerator := walk(balls, 0, half, 0, 0)
	return float64(numerator) / float64(denominator)
}

// Sum of per-color binomial products over the completions whose two
// boxes end with equal distinct-color counts.
func walk(balls []int, index, remaining, distinct1, distinct2 int) int64 {
	if index == len(balls) {
		if remaining == 0 && distinct1 == distinct2 {
			return 1
		}
		return 0
	}
	count := balls[index]
	var ways int64
	limit := count
	if remaining < limit {
		limit = remaining
	}
	for x := 0; x <= limit; x++ {
		d1, d2 := distinct1, distinct2
		if x > 0 {
			d1++
		}
		if x < count {
			d2++
		}
		ways += binomial(count, x) * walk(balls, index+1, remaining-x, d1, d2)
	}
	return ways
}

func binomial(n, k int) int64 {
	var result int64 = 1
	for i := 1; i <= k; i++ {
		result = result * int64(n-k+i) / int64(i)
	}
	return result
}
