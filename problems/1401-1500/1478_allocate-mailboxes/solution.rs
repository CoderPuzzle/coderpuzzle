impl Solution {
    pub fn min_distance(houses: Vec<i32>, k: i32) -> i32 {
        let mut houses = houses;
        houses.sort();
        let n = houses.len();
        let k = k as usize;
        let mut memo = vec![vec![-1i64; k + 1]; n];

        fn run_cost(houses: &Vec<i32>, i: usize, j: usize) -> i64 {
            let mut total = 0i64;
            let (mut lo, mut hi) = (i, j);
            while lo < hi {
                total += (houses[hi] - houses[lo]) as i64;
                lo += 1;
                hi -= 1;
            }
            total
        }

        fn dp(houses: &Vec<i32>, memo: &mut Vec<Vec<i64>>, i: usize, boxes: usize, k: usize) -> i64 {
            let n = houses.len();
            if boxes >= n - i {
                return 0;
            }
            if memo[i][boxes] != -1 {
                return memo[i][boxes];
            }
            if boxes == 1 {
                memo[i][boxes] = run_cost(houses, i, n - 1);
                return memo[i][boxes];
            }
            let mut best = i64::MAX / 4;
            for j in i..=(n - boxes) {
                best = best.min(run_cost(houses, i, j) + dp(houses, memo, j + 1, boxes - 1, k));
            }
            memo[i][boxes] = best;
            best
        }

        dp(&houses, &mut memo, 0, k, k) as i32
    }
}
