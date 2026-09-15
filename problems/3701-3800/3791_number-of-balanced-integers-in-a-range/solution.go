import "strconv"

func countBalanced(low, high int64) int64 {
	countUpTo := func(x int64) int64 {
		if x < 10 {
			return 0
		}
		s := strconv.FormatInt(x, 10)
		n := len(s)
		span := 9 * n
		size := 2*span + 1
		// ways[i][t+span]: assignments of slots i..n-1 with free digits
		// 0..9 whose signed sum is t (slot j contributes +digit when j is
		// even and -digit when j is odd, 0-based from the left). Counts
		// reach 10^15 + 1, past 32 bits, so the table holds int64s.
		ways := make([][]int64, n+1)
		for i := range ways {
			ways[i] = make([]int64, size)
		}
		ways[n][span] = 1
		for i := n - 1; i >= 0; i-- {
			sign := 1
			if i%2 != 0 {
				sign = -1
			}
			for t := -span; t <= span; t++ {
				var total int64
				for d := 0; d <= 9; d++ {
					u := t - sign*d
					if u >= -span && u <= span {
						total += ways[i+1][u+span]
					}
				}
				ways[i][t+span] = total
			}
		}
		var count int64
		diff := 0
		for i := 0; i < n; i++ {
			v := int(s[i] - '0')
			sign := 1
			if i%2 != 0 {
				sign = -1
			}
			// A digit below x's own fixes a smaller prefix forever, so
			// the freed tail counts whenever it can cancel the running
			// difference; x's digit itself keeps the walk tight.
			for c := 0; c < v; c++ {
				u := -diff - sign*c
				if u >= -span && u <= span {
					count += ways[i+1][u+span]
				}
			}
			diff += sign * v
		}
		if diff == 0 {
			count++
		}
		// Padding with leading zeros preserves "alternating sum is
		// zero" exactly for balanced numbers, but lets m = 0 slip in;
		// it is the only non-balanced value ever counted, so drop it.
		return count - 1
	}
	return countUpTo(high) - countUpTo(low-1)
}
