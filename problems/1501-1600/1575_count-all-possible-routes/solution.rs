const MOD: i64 = 1_000_000_007;

impl Solution {
    pub fn count_routes(locations: Vec<i32>, start: i32, finish: i32, fuel: i32) -> i32 {
        let n = locations.len();
        let fuel = fuel as usize;
        let mut memo: Vec<Vec<i64>> = vec![vec![-1; fuel + 1]; n];
        Self::routes_from(&locations, finish, start as usize, fuel, &mut memo) as i32
    }

    fn routes_from(locations: &[i32], finish: i32, city: usize, remaining: usize, memo: &mut Vec<Vec<i64>>) -> i64 {
        if memo[city][remaining] != -1 {
            return memo[city][remaining];
        }
        // A route may stop here (only valid when this city is the
        // destination) or continue on to any other city that still leaves
        // non-negative fuel; both possibilities are counted.
        let mut total: i64 = if city as i32 == finish { 1 } else { 0 };
        for neighbor in 0..locations.len() {
            if neighbor == city {
                continue;
            }
            let cost = (locations[city] - locations[neighbor]).unsigned_abs() as usize;
            if cost <= remaining {
                total += Self::routes_from(locations, finish, neighbor, remaining - cost, memo);
            }
        }
        total %= MOD;
        memo[city][remaining] = total;
        total
    }
}
