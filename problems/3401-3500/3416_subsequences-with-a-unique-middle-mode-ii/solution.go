const MOD = 1000000007

func c2(x int64) int64 {
	if x >= 2 {
		return x * (x - 1) / 2
	}
	return 0
}

func cm(a, b int64) int64 { return a % MOD * (b % MOD) % MOD }

func norm(x int64) int64 {
	m := x % MOD
	if m < 0 {
		return m + MOD
	}
	return m
}

func subsequencesWithMiddleMode(nums []int) int {
	n := len(nums)
	total := make(map[int]int)
	for _, x := range nums {
		total[x]++
	}
	// Exact power-sum aggregates over left-side counts lw, kept as true
	// int64 values (bounded by n^3 <= 1e15) so every division by 2 below
	// happens on a genuine integer.
	left := make(map[int]int)
	var S1, S2, S3 int64 // sum lw, sum lw^2, sum lw^3
	var T1, T2, T3 int64 // sum lw*cnt, lw*cnt^2, lw^2*cnt
	var SC2 int64
	for _, c := range total {
		SC2 += int64(c) * int64(c)
	}

	answer := 0
	for i, v := range nums {
		cntv := total[v]
		l := left[v]
		r := cntv - l - 1             // the middle occurrence is on neither side
		NL := int64(i - l)            // non-v elements left of i
		NR := int64(n-1-i) - int64(r) // non-v elements right of i

		// Per-value sums over w != v, rebuilt from the aggregates. For v
		// itself the moment value cnt - l still contains the middle
		// element, so its exclusion squares (r + 1).
		sumLw2 := S2 - int64(l)*int64(l)
		sumLw := S1 - int64(l)
		sumRw2 := SC2 - 2*T1 + S2 - int64(r+1)*int64(r+1)
		sumRw := int64(n-1-i) - int64(r)
		sumLwRw := (T1 - int64(l)*int64(cntv)) - sumLw2
		sumLwRw2 := (T2 - int64(l)*int64(cntv)*int64(cntv)) - 2*(T3-int64(l)*int64(l)*int64(cntv)) + (S3 - int64(l)*int64(l)*int64(l))
		sumLw2Rw := (T3 - int64(l)*int64(l)*int64(cntv)) - (S3 - int64(l)*int64(l)*int64(l))
		sumC2rw := (sumRw2 - sumRw) / 2
		sumC2lw := (sumLw2 - sumLw) / 2
		// sum_w lw*rw*(NR - rw) and sum_w rw*lw*(NL - lw)
		d10 := NR*sumLwRw - sumLwRw2
		d01 := NL*sumLwRw - sumLw2Rw

		// Count by f, the frequency of v inside the subsequence. With
		// f >= 3 no other value can catch up, so only f = 2 needs the
		// inclusion-exclusion on the three non-v fills.
		c2l, c2r := c2(int64(l)), c2(int64(r))
		val := cm(c2l, c2r)                                                          // f = 5
		val += (cm(int64(l), c2r)*NL + cm(c2l, int64(r))*NR) % MOD                   // f = 4
		val += cm(c2r, c2(NL)) + cm(cm(int64(l), int64(r)), NL*NR) + cm(c2l, c2(NR)) // f = 3
		// f = 2: one more v on the left (or right), the three non-v fills
		// pairwise distinct.
		g10 := norm(NL*c2(NR) - NL*sumC2rw - d10)
		val += int64(l) * g10 % MOD
		g01 := norm(c2(NL)*NR - NR*sumC2lw - d01)
		val += int64(r) * g01 % MOD

		answer = (answer + int(val)) % MOD

		// nums[i] joins the left side for every later middle.
		old := int64(l)
		S1++
		S2 += 2*old + 1
		S3 += 3*old*old + 3*old + 1
		T1 += int64(cntv)
		T2 += int64(cntv) * int64(cntv)
		T3 += int64(cntv) * (2*old + 1)
		left[v] = l + 1
	}
	return answer
}
