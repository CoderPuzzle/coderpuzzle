import "sort"

func maximumValueSum(board [][]int) int64 {
	m := len(board)
	// Per row, only the three most valuable cells can ever matter: a rook
	// of an optimal placement sitting outside its row's top three swaps
	// into one of them — the three candidate columns face at most two
	// blocked ones, so some column is free and the swap never lowers the
	// sum.
	type cell struct {
		value int
		col   int
	}
	tops := make([][]cell, m)
	for i, row := range board {
		cells := make([]cell, len(row))
		for j, v := range row {
			cells[j] = cell{v, j}
		}
		sort.Slice(cells, func(a, b int) bool { return cells[a].value > cells[b].value })
		tops[i] = cells[:3]
	}

	// Row triples with one candidate each, pairwise-distinct columns.
	// Candidates are value-sorted, so combos run in decreasing partial-sum
	// order and a level is abandoned once even its best completion — the
	// other rows' top cells — cannot beat the answer. Sums reach
	// 3 * 10^9 in absolute value, past the 32-bit range, hence the int64s.
	const neg int64 = -(1 << 62)
	ans := neg
	for i := 0; i < m; i++ {
		ti := tops[i]
		for j := i + 1; j < m; j++ {
			tj := tops[j]
			jTop := int64(tj[0].value)
			for k := j + 1; k < m; k++ {
				tk := tops[k]
				kTop := int64(tk[0].value)
				for _, a := range ti {
					if int64(a.value)+jTop+kTop <= ans {
						break
					}
					for _, b := range tj {
						if b.col == a.col {
							continue
						}
						if int64(a.value)+int64(b.value)+kTop <= ans {
							break
						}
						cb := b.col
						for _, c := range tk {
							if c.col == a.col || c.col == cb {
								continue
							}
							total := int64(a.value) + int64(b.value) + int64(c.value)
							if total > ans {
								ans = total
							}
							break
						}
					}
				}
			}
		}
	}
	return ans
}
