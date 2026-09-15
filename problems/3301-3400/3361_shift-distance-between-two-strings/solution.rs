impl Solution {
    // Prefix sums over the two cyclic cost rings give every letter
    // pair's cheaper direction; the answer sums the per-index pair
    // costs. One pair costs at most 25 * 10^9 = 2.5*10^10, so pair
    // costs and the grand total are accumulated in i64.
    pub fn shift_distance(s: String, t: String, next_cost: Vec<i32>, previous_cost: Vec<i32>) -> i64 {
        let mut pn = [0i64; 27];
        let mut pp = [0i64; 27];
        for k in 0..26 {
            pn[k + 1] = pn[k] + next_cost[k] as i64;
            pp[k + 1] = pp[k] + previous_cost[k] as i64;
        }
        let mut cost = [[0i64; 26]; 26];
        for a in 0..26 {
            for b in 0..26 {
                let nxt: i64 = if a < b {
                    pn[b] - pn[a]
                } else if a > b {
                    pn[26] - pn[a] + pn[b]
                } else {
                    0
                };
                let prv: i64 = if b < a {
                    pp[a + 1] - pp[b + 1]
                } else if b > a {
                    pp[26] - pp[b + 1] + pp[a + 1]
                } else {
                    0
                };
                cost[a][b] = nxt.min(prv);
            }
        }
        let sb: Vec<u8> = s.bytes().collect();
        let tb: Vec<u8> = t.bytes().collect();
        let mut total: i64 = 0;
        for i in 0..sb.len() {
            total += cost[(sb[i] - b'a') as usize][(tb[i] - b'a') as usize];
        }
        total
    }
}
