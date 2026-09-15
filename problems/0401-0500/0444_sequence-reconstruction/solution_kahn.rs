use std::collections::VecDeque;

impl Solution {
    pub fn sequence_reconstruction(nums: Vec<i32>, sequences: Vec<Vec<i32>>) -> bool {
        // Read the sequences as a precedence graph: each consecutive pair pins
        // u before v, and the shortest supersequences are exactly the
        // permutations of [1, n] respecting every pinned pair. Kahn's algorithm
        // peels the graph's sources in order; the order is forced exactly when
        // there is never more than one source to pick from.
        let n = nums.len();
        for seq in &sequences {
            for &x in seq {
                // A value outside [1, n] cannot occur in nums at all, so nums
                // is not even a supersequence.
                if x < 1 || x > n as i32 {
                    return false;
                }
            }
        }
        let mut successors = vec![Vec::new(); n + 1];
        let mut unpinned = vec![0usize; n + 1];
        for seq in &sequences {
            for w in seq.windows(2) {
                let (u, v) = (w[0] as usize, w[1] as usize);
                // A repeated pair only pads v's count; every copy is discharged
                // together when u is picked, so multiplicity is harmless. A
                // pair pinned to one value never discharges and reads as a loop.
                successors[u].push(v);
                unpinned[v] += 1;
            }
        }
        // The free values are the ones with no unpinned predecessor left: two
        // at once could each come next, none means the pairs loop.
        let mut free: VecDeque<usize> = (1..=n).filter(|&x| unpinned[x] == 0).collect();
        for &want in &nums {
            if free.len() != 1 {
                return false;
            }
            let u = free.pop_front().unwrap();
            // The forced next value must be nums's own next value.
            if u != want as usize {
                return false;
            }
            for &v in &successors[u] {
                unpinned[v] -= 1;
                if unpinned[v] == 0 {
                    free.push_back(v);
                }
            }
        }
        true
    }
}
