// Any two disjoint rectangles are separated by a straight line, so three
// covers always admit a hierarchical split: peel one side band, cover its
// ones with their tight box, and split the remainder into two tight boxes
// with one internal cut. Trying every peel and cut over all four rotations
// finds the optimum. Pieces track genuine tight extents because a peeled
// band may hold empty rows inside its span.
func minimumSum(grid [][]int) int {
	const inf = 1 << 30
	best := inf
	g := grid
	for rot := 0; rot < 4; rot++ {
		m := len(g)
		n := len(g[0])
		firsts := make([]int, m)
		lasts := make([]int, m)
		for r := 0; r < m; r++ {
			firsts[r], lasts[r] = -1, -1
			for c := 0; c < n; c++ {
				if g[r][c] == 1 {
					if firsts[r] == -1 {
						firsts[r] = c
					}
					lasts[r] = c
				}
			}
		}
		for i := 1; i < m; i++ {
			// single rect over the peeled band rows [0..i)
			tany := false
			trlo, trhi, tclo, tchi := m, -1, n, -1
			for r := 0; r < i; r++ {
				if firsts[r] != -1 {
					tany = true
					trlo = min(trlo, r)
					trhi = max(trhi, r)
					tclo = min(tclo, firsts[r])
					tchi = max(tchi, lasts[r])
				}
			}
			if !tany {
				continue
			}
			topArea := (trhi - trlo + 1) * (tchi - tclo + 1)

			// two rects over rows [i..m): horizontal cuts
			sh := m - i
			sAny := make([]bool, sh+1)
			sRlo := make([]int, sh+1)
			sRhi := make([]int, sh+1)
			sClo := make([]int, sh+1)
			sChi := make([]int, sh+1)
			for k := range sClo {
				sClo[k] = n
			}
			brlo, brhi, bclo, bchi, bany := sh, -1, n, -1, false
			for idx := sh - 1; idx >= 0; idx-- {
				if firsts[i+idx] != -1 {
					bany = true
					brlo = min(brlo, idx)
					brhi = max(brhi, idx)
					bclo = min(bclo, firsts[i+idx])
					bchi = max(bchi, lasts[i+idx])
				}
				sAny[idx], sRlo[idx], sRhi[idx] = bany, brlo, brhi
				sClo[idx], sChi[idx] = bclo, bchi
			}
			inner := inf
			prlo, prhi, pclo, pchi, pany := sh, -1, n, -1, false
			for idx := 0; idx+1 < sh; idx++ {
				if firsts[i+idx] != -1 {
					pany = true
					prlo = min(prlo, idx)
					prhi = max(prhi, idx)
					pclo = min(pclo, firsts[i+idx])
					pchi = max(pchi, lasts[i+idx])
				}
				if pany && sAny[idx+1] {
					cand := (prhi-prlo+1)*(pchi-pclo+1) +
						(sRhi[idx+1]-sRlo[idx+1]+1)*(sChi[idx+1]-sClo[idx+1]+1)
					inner = min(inner, cand)
				}
			}

			// two rects over rows [i..m): vertical cuts
			colLo := make([]int, n)
			colHi := make([]int, n)
			cseen := make([]bool, n)
			for k := range colLo {
				colLo[k] = m
				colHi[k] = -1
			}
			for idx := 0; idx < sh; idx++ {
				if firsts[i+idx] == -1 {
					continue
				}
				row := g[i+idx]
				for c := firsts[i+idx]; c <= lasts[i+idx]; c++ {
					if row[c] == 1 {
						cseen[c] = true
						colLo[c] = min(colLo[c], idx)
						colHi[c] = max(colHi[c], idx)
					}
				}
			}
			vAny := make([]bool, n+1)
			vRlo := make([]int, n+1)
			vRhi := make([]int, n+1)
			vClo := make([]int, n+1)
			vChi := make([]int, n+1)
			for k := range vRlo {
				vRlo[k] = m
				vClo[k] = n
			}
			vrlo, vrhi, vclo, vchi, vany := m, -1, n, -1, false
			for c := n - 1; c >= 0; c-- {
				if cseen[c] {
					vany = true
					vrlo = min(vrlo, colLo[c])
					vrhi = max(vrhi, colHi[c])
					vclo = min(vclo, c)
					vchi = max(vchi, c)
				}
				vAny[c], vRlo[c], vRhi[c] = vany, vrlo, vrhi
				vClo[c], vChi[c] = vclo, vchi
			}
			lrlo, lrhi, lclo, lchi, lany := m, -1, n, -1, false
			for j := 0; j+1 < n; j++ {
				if cseen[j] {
					lany = true
					lrlo = min(lrlo, colLo[j])
					lrhi = max(lrhi, colHi[j])
					lclo = min(lclo, j)
					lchi = max(lchi, j)
				}
				if lany && vAny[j+1] {
					cand := (lrhi-lrlo+1)*(lchi-lclo+1) +
						(vRhi[j+1]-vRlo[j+1]+1)*(vChi[j+1]-vClo[j+1]+1)
					inner = min(inner, cand)
				}
			}

			if inner < inf {
				best = min(best, topArea+inner)
			}
		}
		g = rotate90(g)
	}
	// At least three 1's guarantee some valid partition exists.
	return best
}

// rotate90 applies a 90-degree clockwise rotation.
func rotate90(g [][]int) [][]int {
	m := len(g)
	n := len(g[0])
	out := make([][]int, n)
	for i := range out {
		out[i] = make([]int, m)
		for j := 0; j < m; j++ {
			out[i][j] = g[m-1-j][i]
		}
	}
	return out
}
