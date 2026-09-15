use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn rearrange_string(s: String, k: i32) -> String {
        // Distance k apart is vacuous when k <= 1: any two positions already
        // qualify, and the pinned canonical returns s unchanged.
        if k <= 1 {
            return s;
        }
        let k = k as usize;
        let mut counts = [0i32; 26];
        for byte in s.bytes() {
            counts[(byte - b'a') as usize] += 1;
        }
        // Max-heap keyed by (count, Reverse(letter)): pops land in the pinned
        // pass order — largest remaining count first, ties to the smaller
        // letter.
        let mut heap: BinaryHeap<(i32, Reverse<u8>)> = BinaryHeap::new();
        for letter in 0..26u8 {
            if counts[letter as usize] > 0 {
                heap.push((counts[letter as usize], Reverse(letter)));
            }
        }
        let mut out = String::with_capacity(s.len());
        let mut total = s.len();
        while total > 0 {
            let take = k.min(heap.len());
            // Fewer than k distinct letters while more remain: some window of
            // k consecutive positions would have to repeat a letter, so no
            // arrangement exists.
            if take < k && total > take {
                return String::new();
            }
            // Drain the pass before pushing back, so a letter never repeats
            // within its own pass.
            let mut taken = Vec::with_capacity(take);
            for _ in 0..take {
                taken.push(heap.pop().unwrap());
            }
            for (count, Reverse(letter)) in taken {
                out.push((b'a' + letter) as char);
                total -= 1;
                if count - 1 > 0 {
                    heap.push((count - 1, Reverse(letter)));
                }
            }
        }
        out
    }
}
