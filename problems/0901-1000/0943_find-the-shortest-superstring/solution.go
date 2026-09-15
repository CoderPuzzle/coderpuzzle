func shortestSuperstring(words []string) string {
	k := len(words)
	overlap := make([][]int, k)
	for i := 0; i < k; i++ {
		overlap[i] = make([]int, k)
	}
	for i := 0; i < k; i++ {
		for j := 0; j < k; j++ {
			if i == j {
				continue
			}
			best := 0
			limit := len(words[i])
			if len(words[j]) < limit {
				limit = len(words[j])
			}
			for size := 1; size <= limit; size++ {
				if words[i][len(words[i])-size:] == words[j][:size] {
					best = size
				}
			}
			overlap[i][j] = best
		}
	}

	seqLess := func(x, y []int) bool {
		for q := 0; q < len(x); q++ {
			if x[q] != y[q] {
				return x[q] < y[q]
			}
		}
		return false
	}

	total := 1 << uint(k)
	dpLen := make([][]int, total)
	dpStr := make([][]string, total)
	dpSeq := make([][][]int, total)
	has := make([][]bool, total)
	for m := 0; m < total; m++ {
		dpLen[m] = make([]int, k)
		dpStr[m] = make([]string, k)
		dpSeq[m] = make([][]int, k)
		has[m] = make([]bool, k)
		for j := 0; j < k; j++ {
			dpLen[m][j] = -1
			dpSeq[m][j] = []int{}
		}
	}
	for i := 0; i < k; i++ {
		dpLen[1<<uint(i)][i] = len(words[i])
		dpStr[1<<uint(i)][i] = words[i]
		dpSeq[1<<uint(i)][i] = []int{i}
		has[1<<uint(i)][i] = true
	}

	for mask := 0; mask < total; mask++ {
		for j := 0; j < k; j++ {
			if !has[mask][j] {
				continue
			}
			curLen := dpLen[mask][j]
			curStr := dpStr[mask][j]
			curSeq := dpSeq[mask][j]
			for nxt := 0; nxt < k; nxt++ {
				if (mask>>uint(nxt))&1 != 0 {
					continue
				}
				candLen := curLen + len(words[nxt]) - overlap[j][nxt]
				candStr := curStr + words[nxt][overlap[j][nxt]:]
				candSeq := make([]int, len(curSeq), len(curSeq)+1)
				copy(candSeq, curSeq)
				candSeq = append(candSeq, nxt)
				newMask := mask | (1 << uint(nxt))
				if !has[newMask][nxt] || candLen < dpLen[newMask][nxt] ||
					(candLen == dpLen[newMask][nxt] && seqLess(candSeq, dpSeq[newMask][nxt])) {
					dpLen[newMask][nxt] = candLen
					dpStr[newMask][nxt] = candStr
					dpSeq[newMask][nxt] = candSeq
					has[newMask][nxt] = true
				}
			}
		}
	}

	full := total - 1
	bestJ := -1
	for j := 0; j < k; j++ {
		if !has[full][j] {
			continue
		}
		if bestJ == -1 || dpLen[full][j] < dpLen[full][bestJ] ||
			(dpLen[full][j] == dpLen[full][bestJ] && seqLess(dpSeq[full][j], dpSeq[full][bestJ])) {
			bestJ = j
		}
	}
	return dpStr[full][bestJ]
}
