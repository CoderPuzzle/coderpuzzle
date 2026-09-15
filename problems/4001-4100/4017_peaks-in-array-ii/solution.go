func countOfPeaks(nums []int, queries [][]int) []int64 {
	n := len(nums)

	isPeak := func(i int) bool {
		return i > 0 && i < n-1 && nums[i] > nums[i-1] && nums[i] > nums[i+1]
	}

	// The peak set lives implicitly in a Fenwick tree of 0/1 counts whose
	// prefix sums locate predecessors and successors by descent; a second
	// tree holds value[p] = p * (p - prev(p)) for every present peak p.
	cnt := make([]int, n+1)
	val := make([]int64, n+1)
	total := 0

	addCnt := func(i, delta int) {
		i++
		for i <= n {
			cnt[i] += delta
			i += i & -i
		}
	}
	prefixCnt := func(i int) int {
		i++
		t := 0
		for i > 0 {
			t += cnt[i]
			i -= i & -i
		}
		return t
	}
	kth := func(c int) int { // position of the c-th peak (1-based rank), 0-indexed
		pos := 0
		for pw := 1 << 17; pw > 0; pw >>= 1 {
			if pos+pw <= n && cnt[pos+pw] < c {
				pos += pw
				c -= cnt[pos]
			}
		}
		return pos
	}
	addVal := func(i int, delta int64) {
		i++
		for i <= n {
			val[i] += delta
			i += i & -i
		}
	}
	prefixVal := func(i int) int64 {
		i++
		var t int64
		for i > 0 {
			t += val[i]
			i -= i & -i
		}
		return t
	}
	rangeVal := func(l, r int) int64 {
		return prefixVal(r) - prefixVal(l-1)
	}

	insertPeak := func(x int) {
		prevP := 0
		if c := prefixCnt(x - 1); c > 0 {
			prevP = kth(c)
		}
		nextP := -1
		if c := prefixCnt(x); c < total {
			nextP = kth(c + 1)
		}
		addCnt(x, 1)
		total++
		addVal(x, int64(x)*int64(x-prevP))
		if nextP >= 0 {
			addVal(nextP, int64(nextP)*int64(nextP-x)-int64(nextP)*int64(nextP-prevP))
		}
	}
	removePeak := func(x int) {
		prevP := 0
		if c := prefixCnt(x - 1); c > 0 {
			prevP = kth(c)
		}
		nextP := -1
		if c := prefixCnt(x); c < total {
			nextP = kth(c + 1)
		}
		addCnt(x, -1)
		total--
		addVal(x, -int64(x)*int64(x-prevP))
		if nextP >= 0 {
			addVal(nextP, int64(nextP)*int64(nextP-prevP)-int64(nextP)*int64(nextP-x))
		}
	}

	for i := 1; i+1 < n; i++ {
		if isPeak(i) {
			insertPeak(i)
		}
	}

	answer := []int64{}
	for _, q := range queries {
		if q[0] == 1 {
			l, r := q[1], q[2]
			cA := prefixCnt(l)
			if cA >= total {
				answer = append(answer, 0)
				continue
			}
			a := kth(cA + 1)
			if a >= r {
				answer = append(answer, 0)
				continue
			}
			b := kth(prefixCnt(r - 1))
			qv := 0
			if cQ := prefixCnt(a - 1); cQ > 0 {
				qv = kth(cQ)
			}
			w := rangeVal(a, b)
			answer = append(answer, int64(r)*int64(b-l)-w+int64(a)*int64(l-qv))
		} else {
			idx, nv := q[1], q[2]
			for j := idx - 1; j <= idx+1; j++ {
				if j >= 0 && j < n && isPeak(j) {
					removePeak(j)
				}
			}
			nums[idx] = nv
			for j := idx - 1; j <= idx+1; j++ {
				if j >= 0 && j < n && isPeak(j) {
					insertPeak(j)
				}
			}
		}
	}
	return answer
}
