impl Solution {
    pub fn number_of_nodes(n: i32, queries: Vec<i32>) -> i32 {
        // Order does not matter -- only how many times each subtree was
        // flipped. A node v's final value is the parity of (flips queried
        // on v) + (flips queried on every ancestor of v), since each such
        // query covers v too. Count queries per label, then sweep labels
        // 1..n passing accumulated flip counts parent -> child; the tree
        // shape guarantees the parent index v / 2 is already finished.
        let n = n as usize;
        let mut counts = vec![0i32; n + 1];
        for &q in queries.iter() {
            counts[q as usize] += 1;
        }
        let mut flips = vec![0i32; n + 1];
        let mut total = 0i32;
        for v in 1..=n {
            flips[v] = counts[v] + if v >= 2 { flips[v / 2] } else { 0 };
            total += flips[v] % 2;
        }
        total
    }
}
