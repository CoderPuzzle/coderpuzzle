impl Solution {
    pub fn minimum_sum(grid: Vec<Vec<i32>>) -> i32 {
        const INF: i32 = 1 << 30;
        // Any two disjoint rectangles are separated by a straight line, so
        // three covers always admit a hierarchical split: peel one side
        // band, cover its ones with their tight box, and split the remainder
        // into two tight boxes with one internal cut. Trying every peel and
        // cut over all four rotations finds the optimum. Pieces track
        // genuine tight extents because a peeled band may hold empty rows
        // inside its span.
        let mut best = INF;
        let mut g = grid;
        for _ in 0..4 {
            let m = g.len();
            let n = g[0].len();
            let mut firsts = vec![-1i32; m];
            let mut lasts = vec![-1i32; m];
            for r in 0..m {
                for c in 0..n {
                    if g[r][c] == 1 {
                        if firsts[r] == -1 {
                            firsts[r] = c as i32;
                        }
                        lasts[r] = c as i32;
                    }
                }
            }
            for cut_row in 1..m {
                let sh = m - cut_row;
                // single rect over the peeled band rows [0..cut_row)
                let mut tany = false;
                let mut trlo = m as i32;
                let mut trhi = -1;
                let mut tclo = n as i32;
                let mut tchi = -1;
                for r in 0..cut_row {
                    if firsts[r] != -1 {
                        tany = true;
                        trlo = trlo.min(r as i32);
                        trhi = trhi.max(r as i32);
                        tclo = tclo.min(firsts[r]);
                        tchi = tchi.max(lasts[r]);
                    }
                }
                if !tany {
                    continue;
                }
                let top_area = (trhi - trlo + 1) * (tchi - tclo + 1);

                // two rects over rows [cut_row..m): horizontal cuts
                let mut s_any = vec![false; sh + 1];
                let mut s_rlo = vec![0i32; sh + 1];
                let mut s_rhi = vec![-1i32; sh + 1];
                let mut s_clo = vec![n as i32; sh + 1];
                let mut s_chi = vec![-1i32; sh + 1];
                let (mut brlo, mut brhi, mut bclo, mut bchi, mut bany) = (sh as i32, -1, n as i32, -1, false);
                for idx in (0..sh).rev() {
                    if firsts[cut_row + idx] != -1 {
                        bany = true;
                        brlo = brlo.min(idx as i32);
                        brhi = brhi.max(idx as i32);
                        bclo = bclo.min(firsts[cut_row + idx]);
                        bchi = bchi.max(lasts[cut_row + idx]);
                    }
                    s_any[idx] = bany;
                    s_rlo[idx] = brlo;
                    s_rhi[idx] = brhi;
                    s_clo[idx] = bclo;
                    s_chi[idx] = bchi;
                }
                let mut inner = INF;
                let (mut prlo, mut prhi, mut pclo, mut pchi, mut pany) = (sh as i32, -1, n as i32, -1, false);
                for idx in 0..sh.saturating_sub(1) {
                    if firsts[cut_row + idx] != -1 {
                        pany = true;
                        prlo = prlo.min(idx as i32);
                        prhi = prhi.max(idx as i32);
                        pclo = pclo.min(firsts[cut_row + idx]);
                        pchi = pchi.max(lasts[cut_row + idx]);
                    }
                    if pany && s_any[idx + 1] {
                        let cand = (prhi - prlo + 1) * (pchi - pclo + 1)
                            + (s_rhi[idx + 1] - s_rlo[idx + 1] + 1) * (s_chi[idx + 1] - s_clo[idx + 1] + 1);
                        inner = inner.min(cand);
                    }
                }

                // two rects over rows [cut_row..m): vertical cuts
                let mut col_lo = vec![m as i32; n];
                let mut col_hi = vec![-1i32; n];
                let mut cseen = vec![false; n];
                for idx in 0..sh {
                    if firsts[cut_row + idx] == -1 {
                        continue;
                    }
                    let row = &g[cut_row + idx];
                    let lo = firsts[cut_row + idx] as usize;
                    let hi = lasts[cut_row + idx] as usize;
                    for c in lo..=hi {
                        if row[c] == 1 {
                            cseen[c] = true;
                            col_lo[c] = col_lo[c].min(idx as i32);
                            col_hi[c] = col_hi[c].max(idx as i32);
                        }
                    }
                }
                let mut v_any = vec![false; n + 1];
                let mut v_rlo = vec![m as i32; n + 1];
                let mut v_rhi = vec![-1i32; n + 1];
                let mut v_clo = vec![n as i32; n + 1];
                let mut v_chi = vec![-1i32; n + 1];
                let (mut vrlo, mut vrhi, mut vclo, mut vchi, mut vany) = (m as i32, -1, n as i32, -1, false);
                for c in (0..n).rev() {
                    if cseen[c] {
                        vany = true;
                        vrlo = vrlo.min(col_lo[c]);
                        vrhi = vrhi.max(col_hi[c]);
                        vclo = vclo.min(c as i32);
                        vchi = vchi.max(c as i32);
                    }
                    v_any[c] = vany;
                    v_rlo[c] = vrlo;
                    v_rhi[c] = vrhi;
                    v_clo[c] = vclo;
                    v_chi[c] = vchi;
                }
                let (mut lrlo, mut lrhi, mut lclo, mut lchi, mut lany) = (m as i32, -1, n as i32, -1, false);
                for j in 0..n.saturating_sub(1) {
                    if cseen[j] {
                        lany = true;
                        lrlo = lrlo.min(col_lo[j]);
                        lrhi = lrhi.max(col_hi[j]);
                        lclo = lclo.min(j as i32);
                        lchi = lchi.max(j as i32);
                    }
                    if lany && v_any[j + 1] {
                        let cand = (lrhi - lrlo + 1) * (lchi - lclo + 1)
                            + (v_rhi[j + 1] - v_rlo[j + 1] + 1) * (v_chi[j + 1] - v_clo[j + 1] + 1);
                        inner = inner.min(cand);
                    }
                }

                if inner < INF {
                    best = best.min(top_area + inner);
                }
            }
            g = rotate90(g);
        }
        // At least three 1's guarantee some valid partition exists.
        best
    }
}

// 90-degree clockwise rotation.
fn rotate90(g: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
    let m = g.len();
    let n = g[0].len();
    let mut out = vec![vec![0i32; m]; n];
    for i in 0..n {
        for j in 0..m {
            out[i][j] = g[m - 1 - j][i];
        }
    }
    out
}
