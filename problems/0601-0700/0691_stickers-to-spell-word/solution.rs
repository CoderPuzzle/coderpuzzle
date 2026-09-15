use std::collections::VecDeque;

impl Solution {
    pub fn min_stickers(stickers: Vec<String>, target: String) -> i32 {
        // BFS over the bitmask of spelled target positions: bit i is set
        // once position i holds a cut letter. From each state, one copy of
        // a sticker spends its letters on the uncovered positions left to
        // right — covering more positions with the same single copy can
        // never hurt, since equal letters are interchangeable. Layers of
        // the BFS are sticker counts, so the first visit to the full mask
        // is the minimum; a target letter found on no sticker at all makes
        // the task impossible.
        let target = target.into_bytes();
        let m = target.len();
        let full = (1usize << m) - 1;
        let mut available = [false; 26];
        for word in &stickers {
            for &letter in word.as_bytes() {
                available[(letter - b'a') as usize] = true;
            }
        }
        let mut need = Vec::with_capacity(m);
        for &letter in &target {
            let index = (letter - b'a') as usize;
            if !available[index] {
                return -1;
            }
            need.push(index);
        }
        let mut stocks: Vec<[i32; 26]> = Vec::with_capacity(stickers.len());
        for word in &stickers {
            let mut counts = [0; 26];
            for &letter in word.as_bytes() {
                counts[(letter - b'a') as usize] += 1;
            }
            stocks.push(counts);
        }
        let mut distance = vec![-1i32; full + 1];
        distance[0] = 0;
        let mut queue: VecDeque<usize> = VecDeque::new();
        queue.push_back(0);
        while let Some(mask) = queue.pop_front() {
            if mask == full {
                return distance[mask];
            }
            let steps = distance[mask] + 1;
            for counts in &stocks {
                let mut remaining = *counts;
                let mut next = mask;
                for (i, &index) in need.iter().enumerate() {
                    let bit = 1usize << i;
                    if mask & bit == 0 && remaining[index] > 0 {
                        remaining[index] -= 1;
                        next |= bit;
                    }
                }
                if next != mask && distance[next] < 0 {
                    distance[next] = steps;
                    queue.push_back(next);
                }
            }
        }
        -1
    }
}
