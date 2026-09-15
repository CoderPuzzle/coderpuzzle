import "strconv"

func goodIntegers(l int64, r int64, k int) int64 {
	var countGood func(x int64) int64
	countGood = func(x int64) int64 {
		if x < 0 {
			return 0
		}
		s := strconv.FormatInt(x, 10)
		n := len(s)
		digits := make([]int, n)
		for i := 0; i < n; i++ {
			digits[i] = int(s[i] - '0')
		}
		// memo[pos][tight][prev+1][started]; prev index 0 = unused
		memo := make([][][][]int64, n+1)
		for pos := range memo {
			memo[pos] = make([][][]int64, 2)
			for t := range memo[pos] {
				memo[pos][t] = make([][]int64, 11)
				for p := range memo[pos][t] {
					memo[pos][t][p] = make([]int64, 2)
					for st := range memo[pos][t][p] {
						memo[pos][t][p][st] = -1
					}
				}
			}
		}
		var dp func(pos, tight, prev, started int) int64
		dp = func(pos, tight, prev, started int) int64 {
			if pos == n {
				return 1
			}
			slot := &memo[pos][tight][prev+1][started]
			if *slot != -1 {
				return *slot
			}
			limit := 9
			if tight == 1 {
				limit = digits[pos]
			}
			var total int64
			for d := 0; d <= limit; d++ {
				ntight := 0
				if tight == 1 && d == limit {
					ntight = 1
				}
				if started == 0 && d == 0 {
					total += dp(pos+1, ntight, 0, 0)
				} else {
					diff := d - prev
					if diff < 0 {
						diff = -diff
					}
					if started == 1 && diff > k {
						continue
					}
					total += dp(pos+1, ntight, d, 1)
				}
			}
			*slot = total
			return total
		}
		return dp(0, 1, 0, 0)
	}
	return countGood(r) - countGood(l-1)
}
