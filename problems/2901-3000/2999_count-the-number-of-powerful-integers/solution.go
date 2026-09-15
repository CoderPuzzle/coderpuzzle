import "strconv"

func numberOfPowerfulInt(start int64, finish int64, limit int, s string) int64 {
	return countPowerful2999(finish, limit, s) - countPowerful2999(start-1, limit, s)
}

func countPowerful2999(x int64, limit int, s string) int64 {
	if x <= 0 {
		return 0
	}
	n := len(strconv.FormatInt(x, 10))
	lenS := len(s)
	if lenS > n {
		return 0
	}
	sv, _ := strconv.ParseInt(s, 10, 64)
	if x < sv {
		return 0
	}
	cap := (x - sv) / pow10_2999(lenS)
	total := int64(1) // the number s itself (empty prefix)
	for p := 1; p <= n-lenS; p++ {
		total += countExactLen2999(p, cap, limit)
	}
	return total
}

// number of integers with exactly p digits, every digit <= lim, <= cap
func countExactLen2999(p int, cap int64, lim int) int64 {
	if cap < pow10_2999(p-1) {
		return 0
	}
	if cap >= pow10_2999(p)-1 {
		res := int64(lim)
		for i := 0; i < p-1; i++ {
			res *= int64(lim + 1)
		}
		return res
	}
	str := strconv.FormatInt(cap, 10)
	capDigits := make([]int, p)
	for i := 0; i < p; i++ {
		capDigits[i] = int(str[i] - '0')
	}

	memo := make([][]int64, p+1)
	for i := range memo {
		memo[i] = []int64{-1, -1}
	}
	return dp2999(0, 1, p, capDigits, lim, memo)
}

func dp2999(pos int, tight int, p int, capDigits []int, lim int, memo [][]int64) int64 {
	if pos == p {
		return 1
	}
	if memo[pos][tight] >= 0 {
		return memo[pos][tight]
	}
	up := 9
	if tight == 1 {
		up = capDigits[pos]
	}
	lo := 0
	if pos == 0 {
		lo = 1
	}
	hi := up
	if lim < hi {
		hi = lim
	}
	var total int64
	for d := lo; d <= hi; d++ {
		nextTight := 0
		if tight == 1 && d == up {
			nextTight = 1
		}
		total += dp2999(pos+1, nextTight, p, capDigits, lim, memo)
	}
	memo[pos][tight] = total
	return total
}

func pow10_2999(e int) int64 {
	var r int64 = 1
	for i := 0; i < e; i++ {
		r *= 10
	}
	return r
}
