func zigZagArrays(n int, l int, r int) int {
	const mod int64 = 1000000007
	points := n + 1
	values := make([]int64, points+1)
	for width := 2; width <= points; width++ {
		up := make([]int64, width)
		down := make([]int64, width)
		for value := 0; value < width; value++ {
			up[value] = int64(value)
			down[value] = int64(width - 1 - value)
		}
		for length := 3; length <= n; length++ {
			nextUp := make([]int64, width)
			nextDown := make([]int64, width)
			var running int64
			for value := 0; value < width; value++ {
				nextUp[value] = running
				running = (running + down[value]) % mod
			}
			running = 0
			for value := width - 1; value >= 0; value-- {
				nextDown[value] = running
				running = (running + up[value]) % mod
			}
			up, down = nextUp, nextDown
		}
		for value := 0; value < width; value++ {
			values[width] = (values[width] + up[value] + down[value]) % mod
		}
	}
	width := r - l + 1
	if width <= points {
		return int(values[width])
	}
	power := func(base int64, exponent int64) int64 {
		result := int64(1)
		for exponent > 0 {
			if exponent&1 == 1 {
				result = result * base % mod
			}
			base = base * base % mod
			exponent >>= 1
		}
		return result
	}
	factorial := make([]int64, points+1)
	inverseFactorial := make([]int64, points+1)
	factorial[0] = 1
	for value := 1; value <= points; value++ {
		factorial[value] = factorial[value-1] * int64(value) % mod
	}
	inverseFactorial[points] = power(factorial[points], mod-2)
	for value := points; value > 0; value-- {
		inverseFactorial[value-1] = inverseFactorial[value] * int64(value) % mod
	}
	prefix := make([]int64, points+2)
	suffix := make([]int64, points+2)
	prefix[0], suffix[points+1] = 1, 1
	for value := 1; value <= points; value++ {
		prefix[value] = prefix[value-1] * int64(width-value) % mod
	}
	for value := points; value > 0; value-- {
		suffix[value] = suffix[value+1] * int64(width-value) % mod
	}
	var answer int64
	for value := 1; value <= points; value++ {
		term := values[value] * prefix[value-1] % mod * suffix[value+1] % mod
		term = term * inverseFactorial[value-1] % mod * inverseFactorial[points-value] % mod
		if (points-value)%2 == 0 {
			answer += term
		} else {
			answer -= term
		}
	}
	return int((answer%mod + mod) % mod)
}
