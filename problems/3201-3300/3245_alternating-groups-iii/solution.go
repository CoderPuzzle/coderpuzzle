func numberOfAlternatingGroups(colors []int, queries [][]int) []int {
	// Edge j joins tile j and tile j + 1 circularly and is bad when its two
	// endpoints share a color. A size-k group starting at tile s spans the
	// k - 1 consecutive edges s..s+k-2, so counting size-k groups means
	// counting starting edges followed by k - 1 good edges. The bad-edge set
	// lives implicitly in a Fenwick tree of 0/1 counts whose prefix sums
	// locate predecessors and successors by descent, and the multiset of
	// good-edge runs between neighboring bad edges lives in two more trees
	// keyed by run length (one counting runs, one summing lengths); a repaint
	// toggles exactly two edges, each splitting or merging a single run.
	n := len(colors)
	bad := make([]bool, n)
	posCnt := make([]int, n+1)
	runCnt := make([]int, n+1)
	runSum := make([]int, n+1)
	total := 0
	totals := [2]int{}

	addPos := func(i, delta int) {
		i++
		for i <= n {
			posCnt[i] += delta
			i += i & -i
		}
	}
	prefixPos := func(i int) int {
		i++
		t := 0
		for i > 0 {
			t += posCnt[i]
			i -= i & -i
		}
		return t
	}
	kth := func(c int) int { // position of the c-th bad edge (1-based rank)
		pos := 0
		for pw := 1 << 17; pw > 0; pw >>= 1 {
			if pos+pw <= n && posCnt[pos+pw] < c {
				pos += pw
				c -= posCnt[pos]
			}
		}
		return pos
	}
	addRun := func(fen []int, length, delta int) {
		length++
		for length <= n {
			fen[length] += delta
			length += length & -length
		}
	}
	prefixRun := func(fen []int, length int) int {
		length++
		t := 0
		for length > 0 {
			t += fen[length]
			length -= length & -length
		}
		return t
	}
	cyc := func(d int) int { return ((d % n) + n) % n }
	runsUpdate := func(length, delta int) {
		if length > 0 {
			addRun(runCnt, length, delta)
			addRun(runSum, length, delta*length)
			totals[0] += delta
			totals[1] += delta * length
		}
	}
	prevBad := func(e int) int {
		if c := prefixPos(e - 1); c > 0 {
			return kth(c)
		}
		return kth(total)
	}
	nextBad := func(e int) int {
		if c := prefixPos(e); c < total {
			return kth(c + 1)
		}
		return kth(1)
	}
	insertEdge := func(e int) {
		if total > 0 {
			p, nx := prevBad(e), nextBad(e)
			runsUpdate(cyc(nx-p-1), -1)
			runsUpdate(cyc(e-p-1), 1)
			runsUpdate(cyc(nx-e-1), 1)
		}
		addPos(e, 1)
		total++
		if total == 1 {
			runsUpdate(n-1, 1)
		}
	}
	removeEdge := func(e int) {
		addPos(e, -1)
		total--
		if total > 0 {
			p, nx := prevBad(e), nextBad(e)
			runsUpdate(cyc(e-p-1), -1)
			runsUpdate(cyc(nx-e-1), -1)
			runsUpdate(cyc(nx-p-1), 1)
		} else {
			runsUpdate(n-1, -1)
		}
	}

	for j := 0; j < n; j++ {
		bad[j] = colors[j] == colors[(j+1)%n]
		if bad[j] {
			insertEdge(j)
		}
	}

	answer := make([]int, 0, len(queries))
	for _, query := range queries {
		if query[0] == 1 {
			if total == 0 {
				answer = append(answer, n)
				continue
			}
			need := query[1] - 1
			cntGe := totals[0] - prefixRun(runCnt, need-1)
			sumGe := totals[1] - prefixRun(runSum, need-1)
			answer = append(answer, sumGe-(need-1)*cntGe)
		} else {
			index, color := query[1], query[2]
			if colors[index] == color {
				continue
			}
			colors[index] = color
			for _, e := range [2]int{(index + n - 1) % n, index} {
				isBad := colors[e] == colors[(e+1)%n]
				if isBad == bad[e] {
					continue
				}
				bad[e] = isBad
				if isBad {
					insertEdge(e)
				} else {
					removeEdge(e)
				}
			}
		}
	}
	return answer
}
