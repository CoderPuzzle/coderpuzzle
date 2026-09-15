// Appends the inclusive pieces of [lo1, hi1] that avoid [lo2, hi2]; returns
// the new piece count (at most two pieces ever fit).
func addPieces(lo1, hi1, lo2, hi2 int, loOut, hiOut []int, count int) int {
	if lo1 > hi1 {
		return count
	}
	if hi2 < lo1 || lo2 > hi1 {
		loOut[count], hiOut[count] = lo1, hi1
		count++
	} else {
		if lo1 < lo2 {
			loOut[count], hiOut[count] = lo1, lo2-1
			count++
		}
		if hi2 < hi1 {
			loOut[count], hiOut[count] = hi2+1, hi1
			count++
		}
	}
	return count
}

func canMakePalindromeQueries(s string, queries [][]int) []bool {
	n := len(s)
	half := n / 2
	// prefix[i+1][k] = occurrences of 'a'+k in s[0..i]
	prefix := make([][26]int, n+1)
	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i]
		prefix[i+1][s[i]-'a']++
	}
	// mismatch[i+1] = pairs (x, n-1-x), x <= i, whose characters differ —
	// pairs a query repairs only by covering x or its mirror on its side.
	mismatch := make([]int, half+1)
	for x := 0; x < half; x++ {
		mismatch[x+1] = mismatch[x]
		if s[x] != s[n-1-x] {
			mismatch[x+1]++
		}
	}

	answer := make([]bool, len(queries))
	fixedLo, fixedHi := make([]int, 4), make([]int, 4) // fully fixed left-half ranges
	flLo, flHi := make([]int, 2), make([]int, 2)       // fixed characters facing [c, d]
	frLo, frHi := make([]int, 2), make([]int, 2)       // fixed characters facing [a, b]
	for index, query := range queries {
		a, b, c, d := query[0], query[1], query[2], query[3]
		m1, m2 := n-1-b, n-1-a // mirror of [a, b], right half
		f1, f2 := n-1-d, n-1-c // mirror of [c, d], left half
		// Pairs covered on neither side must already match.
		count := addPieces(0, a-1, f1, f2, fixedLo, fixedHi, 0)
		count = addPieces(b+1, half-1, f1, f2, fixedLo, fixedHi, count)
		bad := 0
		for i := 0; i < count; i++ {
			bad += mismatch[fixedHi[i]+1] - mismatch[fixedLo[i]]
		}
		if bad > 0 {
			continue
		}
		// Pool balance per letter: A + F_L == B + F_R with A covering F_R.
		flCount := addPieces(f1, f2, a, b, flLo, flHi, 0)
		frCount := addPieces(m1, m2, c, d, frLo, frHi, 0)
		ok := true
		for k := 0; k < 26 && ok; k++ {
			poolA := prefix[b+1][k] - prefix[a][k]
			poolB := prefix[d+1][k] - prefix[c][k]
			left, right, fixedR := poolA, poolB, 0
			for i := 0; i < flCount; i++ {
				left += prefix[flHi[i]+1][k] - prefix[flLo[i]][k]
			}
			for i := 0; i < frCount; i++ {
				piece := prefix[frHi[i]+1][k] - prefix[frLo[i]][k]
				right += piece
				fixedR += piece
			}
			if left != right || poolA < fixedR {
				ok = false
			}
		}
		answer[index] = ok
	}
	return answer
}
