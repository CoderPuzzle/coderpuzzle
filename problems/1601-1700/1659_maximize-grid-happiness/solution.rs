// Fill the grid cell by cell, row-major, and charge every bond when its
// second member is placed: a newcomer of type v pays its own base (120
// for an introvert, 40 for an extrovert) plus, for each of the two
// neighbours possibly already placed (left, above), both sides of that
// bond at once — -60 for two introverts, +40 for two extroverts, -10 for
// a mixed pair. The future only needs the occupancy of the last n filled
// cells, held as one ternary mask whose trit 0 is the left neighbour and
// trit n-1 the neighbour above, plus the two budgets left. Every state
// value stays non-negative (an introvert surrounded on all four sides
// still nets 0), so -1 cleanly marks unreachable states.
impl Solution {
    pub fn get_max_grid_happiness(m: i32, n: i32, introverts_count: i32, extroverts_count: i32) -> i32 {
        let n = n as usize;
        let cells = m as usize * n;
        let width = 3usize.pow(n as u32);
        let span = width / 3;
        let pair = [[0i32, 0, 0], [0, -60, -10], [0, -10, 40]];
        let fresh = || vec![[[-1i32; 7]; 7]; width];
        let mut dp = fresh();
        dp[0][introverts_count as usize][extroverts_count as usize] = 0;
        for cell in 0..cells {
            let has_left = cell % n != 0;
            let has_up = cell >= n;
            let mut nxt = fresh();
            for mask in 0..width {
                let left = if has_left { mask % 3 } else { 0 };
                let up = if has_up { (mask / span) % 3 } else { 0 };
                let shifted = (mask % span) * 3;
                for i in 0..7usize {
                    for e in 0..7usize {
                        let best = dp[mask][i][e];
                        if best < 0 {
                            continue;
                        }
                        for (v, base) in [(0usize, 0i32), (1, 120), (2, 40)] {
                            if (v == 1 && i == 0) || (v == 2 && e == 0) {
                                continue;
                            }
                            let mut gain = base;
                            if left != 0 {
                                gain += pair[v][left];
                            }
                            if up != 0 {
                                gain += pair[v][up];
                            }
                            let ni = i - (v == 1) as usize;
                            let ne = e - (v == 2) as usize;
                            if best + gain > nxt[shifted + v][ni][ne] {
                                nxt[shifted + v][ni][ne] = best + gain;
                            }
                        }
                    }
                }
            }
            dp = nxt;
        }
        let mut answer = 0;
        for plane in &dp {
            for row in plane {
                for &value in row {
                    answer = answer.max(value);
                }
            }
        }
        answer
    }
}
