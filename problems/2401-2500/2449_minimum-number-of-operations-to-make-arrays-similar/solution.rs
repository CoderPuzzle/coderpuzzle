impl Solution {
    pub fn make_similar(nums: Vec<i32>, target: Vec<i32>) -> i64 {
        // Every move is +-2, so an element's parity never changes and the
        // even/odd classes evolve independently in size. Within a class,
        // matching sorted positions smallest-to-smallest (hints 2-3) never
        // wastes work: any crossing assignment can be uncrossed without
        // raising the total rise. Each operation supplies exactly one +2,
        // so the answer is the total positive rise divided by 2 — the
        // drops are free riders on the same operations.
        let evens = parity_sorted(&nums, 0);
        let odds = parity_sorted(&nums, 1);
        let tevens = parity_sorted(&target, 0);
        let todds = parity_sorted(&target, 1);
        let mut ops: i64 = 0;
        for (a, b) in evens.iter().zip(tevens.iter()) {
            if b > a {
                ops += i64::from(b - a) / 2;
            }
        }
        for (a, b) in odds.iter().zip(todds.iter()) {
            if b > a {
                ops += i64::from(b - a) / 2;
            }
        }
        ops
    }
}

fn parity_sorted(arr: &[i32], parity: i32) -> Vec<i32> {
    let mut out: Vec<i32> = arr.iter().copied().filter(|&x| x % 2 == parity).collect();
    out.sort_unstable();
    out
}
