impl Solution {
    pub fn max_number(nums1: Vec<i32>, nums2: Vec<i32>, k: i32) -> Vec<i32> {
        let m = nums1.len();
        let n = nums2.len();
        let k = k as usize;
        let mut best: Vec<i32> = Vec::new();
        // Try every split of the k digits between the two arrays and keep the
        // best merged candidate; the answer is the max over all splits.
        for take1 in 0..=m {
            if take1 > k {
                break;
            }
            let take2 = k - take1;
            if take2 > n {
                continue;
            }
            let candidate = Self::merge(
                &Self::max_subsequence(&nums1, take1),
                &Self::max_subsequence(&nums2, take2),
            );
            // Vec comparison is lexicographic, exactly the digit order.
            if candidate > best {
                best = candidate;
            }
        }
        best
    }

    fn max_subsequence(nums: &[i32], t: usize) -> Vec<i32> {
        // Monotonic stack: while digits can still be dropped, pop any smaller
        // digit in front of a larger newcomer, then keep the first t digits.
        let mut stack: Vec<i32> = Vec::with_capacity(nums.len());
        let mut drop = nums.len() - t;
        for &num in nums {
            while drop > 0 && stack.last().is_some_and(|&top| top < num) {
                stack.pop();
                drop -= 1;
            }
            stack.push(num);
        }
        stack.truncate(t);
        stack
    }

    fn merge(a: &[i32], b: &[i32]) -> Vec<i32> {
        let mut merged = Vec::with_capacity(a.len() + b.len());
        let (mut i, mut j) = (0, 0);
        while i < a.len() && j < b.len() {
            // Equal heads are decided by comparing the tails that follow.
            if Self::greater(a, i, b, j) {
                merged.push(a[i]);
                i += 1;
            } else {
                merged.push(b[j]);
                j += 1;
            }
        }
        merged.extend_from_slice(&a[i..]);
        merged.extend_from_slice(&b[j..]);
        merged
    }

    fn greater(a: &[i32], i: usize, b: &[i32], j: usize) -> bool {
        // Is a[i:] the larger remaining sequence? Skip the equal prefix first;
        // whichever tail runs out (or holds the smaller digit) loses the tie.
        let (mut i, mut j) = (i, j);
        while i < a.len() && j < b.len() && a[i] == b[j] {
            i += 1;
            j += 1;
        }
        j == b.len() || (i < a.len() && a[i] > b[j])
    }
}
