impl Solution {
    pub fn largest_perimeter(nums: Vec<i32>) -> i64 {
        let mut a = nums;
        a.sort_unstable();
        let mut total: i64 = a.iter().map(|&x| x as i64).sum();
        // Try candidate longest sides from the largest down; stop at i == 2 so
        // at least three sides remain. The first prefix that closes wins.
        for i in (2..a.len()).rev() {
            // A multiset forms a polygon iff the largest side is smaller than
            // the sum of all the others.
            if total - a[i] as i64 > a[i] as i64 {
                return total;
            }
            // This largest side is hopeless: the smaller sides can never
            // outweigh it, so discard it and try the next candidate.
            total -= a[i] as i64;
        }
        -1
    }
}
