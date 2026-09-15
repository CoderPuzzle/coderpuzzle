import "strconv"

func findIntegers(n int) int {
	s := strconv.FormatUint(uint64(n), 2)
	m := len(s)
	// fib[i] = number of binary strings of length i with no consecutive 1s
	fib := make([]int64, m+2)
	fib[0] = 1
	fib[1] = 2
	for i := 2; i <= m; i++ {
		fib[i] = fib[i-1] + fib[i-2]
	}
	res := int64(0)
	for i := 0; i < m; i++ {
		if s[i] == '1' {
			// place 0 here, suffix can be anything without consecutive ones
			res += fib[m-i-1]
			if i > 0 && s[i-1] == '1' {
				// n itself already contains consecutive ones; stop counting
				return int(res)
			}
		}
	}
	return int(res + 1) // count n itself (its binary has no consecutive ones)
}
