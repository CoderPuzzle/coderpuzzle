impl Solution {
    pub fn count_pairs(nums: Vec<i32>, low: i32, high: i32) -> i32 {
        let below = if low > 0 { Self::pairs_le(&nums, low - 1) } else { 0 };
        (Self::pairs_le(&nums, high) - below) as i32
    }

    fn pairs_le(nums: &[i32], k: i32) -> i64 {
        const BITS: i32 = 16;
        let max_nodes = nums.len() * BITS as usize + 2;
        let mut child = vec![[0usize; 2]; max_nodes]; // 0 = none, root = 1
        let mut count = vec![0i64; max_nodes];
        let mut nodes = 1usize;
        let mut total: i64 = 0;
        for &x in nums {
            // Query the trie of previously inserted numbers.
            let mut node = 1usize;
            let mut b = BITS - 1;
            while b >= 0 && node != 0 {
                let xb = ((x >> b) & 1) as usize;
                if (k >> b) & 1 == 1 {
                    let c = child[node][xb];
                    if c != 0 {
                        total += count[c];
                    }
                    node = child[node][1 - xb];
                } else {
                    node = child[node][xb];
                }
                b -= 1;
            }
            if node != 0 {
                total += count[node];
            }
            // Insert x.
            count[1] += 1;
            node = 1;
            for b in (0..BITS).rev() {
                let d = ((x >> b) & 1) as usize;
                let mut nxt = child[node][d];
                if nxt == 0 {
                    nodes += 1;
                    nxt = nodes;
                    child[node][d] = nxt;
                }
                node = nxt;
                count[node] += 1;
            }
        }
        total
    }
}
