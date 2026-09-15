impl Solution {
    // Knapsack merge of the children's budget profiles: spend t in one child
    // against every budget level b, then a prefix maximum so leftover budget
    // never lowers a value.
    fn combine(kids: &[usize], tables: &[Option<Vec<i32>>], budget: usize) -> Vec<i32> {
        let mut cur = vec![0i32; budget + 1];
        for &child in kids {
            let arr = tables[child].as_ref().unwrap();
            let mut nxt = cur.clone();
            for b in 0..=budget {
                let cb = cur[b];
                for t in 0..=(budget - b) {
                    let val = cb + arr[t];
                    if val > nxt[b + t] {
                        nxt[b + t] = val;
                    }
                }
            }
            cur = nxt;
            for b in 1..=budget {
                if cur[b] < cur[b - 1] {
                    cur[b] = cur[b - 1];
                }
            }
        }
        cur
    }

    pub fn max_profit(n: i32, present: Vec<i32>, future: Vec<i32>, hierarchy: Vec<Vec<i32>>, budget: i32) -> i32 {
        let n = n as usize;
        let budget = budget as usize;
        let mut children: Vec<Vec<usize>> = vec![Vec::new(); n];
        for e in &hierarchy {
            children[e[0] as usize - 1].push(e[1] as usize - 1);
        }

        // BFS order lets every node's children finish before the node itself.
        let mut order: Vec<usize> = Vec::with_capacity(n);
        order.push(0);
        let mut i = 0;
        while i < order.len() {
            let u = order[i];
            i += 1;
            for &v in &children[u] {
                order.push(v);
            }
        }

        // f[u][b]: best profit in u's subtree within budget b when u's boss did
        // not buy (u pays the full price); g[u][b]: the boss did buy (u may pay
        // half). The discount depends only on the direct boss, so two profiles
        // are enough.
        let mut f: Vec<Option<Vec<i32>>> = vec![None; n];
        let mut g: Vec<Option<Vec<i32>>> = vec![None; n];
        for idx in (0..n).rev() {
            let u = order[idx];
            let child_f = Self::combine(&children[u], &f, budget);
            let child_g = Self::combine(&children[u], &g, budget);

            // If u does not buy, its children get no discount, so both tables
            // start from merged child_f. Buying switches to child_g (children
            // become discount-eligible) at the full or halved cost respectively.
            let mut fu = child_f.clone();
            let mut gu = child_f.clone();
            let cost_full = present[u] as usize;
            let cost_disc = (present[u] / 2) as usize;
            let profit_full = future[u] - present[u];
            let profit_disc = future[u] - present[u] / 2;
            for b in 0..=budget {
                if b >= cost_full {
                    let val = child_g[b - cost_full] + profit_full;
                    if val > fu[b] {
                        fu[b] = val;
                    }
                }
                if b >= cost_disc {
                    let val = child_g[b - cost_disc] + profit_disc;
                    if val > gu[b] {
                        gu[b] = val;
                    }
                }
            }
            // Re-apply a prefix maximum after folding in u's own purchase.
            for b in 1..=budget {
                if fu[b] < fu[b - 1] {
                    fu[b] = fu[b - 1];
                }
                if gu[b] < gu[b - 1] {
                    gu[b] = gu[b - 1];
                }
            }
            f[u] = Some(fu);
            g[u] = Some(gu);
        }
        // The CEO has no boss and therefore never gets a discount.
        f[0].as_ref().unwrap()[budget]
    }
}
