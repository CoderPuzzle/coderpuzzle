use std::collections::{HashSet, VecDeque};

impl Solution {
    pub fn max_hamming_distances(nums: Vec<i32>, m: i32) -> Vec<i32> {
        // HD(x, y) + HD(~x, y) = m, so max distance from x = m - minDist(~x).
        let size: usize = 1usize << m;
        let full: usize = size - 1;
        let mut dist: Vec<i32> = vec![size as i32 + 1; size];
        let mut queue: VecDeque<usize> = VecDeque::new();
        let mut seen: HashSet<i32> = HashSet::new();
        // Seed every distinct array value as a BFS source at distance 0.
        for &value in &nums {
            if seen.insert(value) {
                dist[value as usize] = 0;
                queue.push_back(value as usize);
            }
        }
        // One bit flip = one Hamming step; unit edges make first reach shortest.
        while let Some(v) = queue.pop_front() {
            let nd = dist[v] + 1;
            for bit in 0..m {
                let u = v ^ (1usize << bit);
                if dist[u] > nd {
                    dist[u] = nd;
                    queue.push_back(u);
                }
            }
        }
        // The complement's closest element is x's farthest.
        nums.iter().map(|&x| m - dist[full ^ (x as usize)]).collect()
    }
}
