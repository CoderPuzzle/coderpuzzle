use std::collections::VecDeque;

// Invert to days: days[p] is the turn on which position p lights. A window
// (i, i+k+1) qualifies exactly when both endpoints light before every
// interior position, and it qualifies on the day max(days[i], days[i+k+1]);
// the answer is the minimum such day.
impl Solution {
    pub fn k_empty_slots(bulbs: Vec<i32>, k: i32) -> i32 {
        let n = bulbs.len();
        let k = k as usize;
        if n < k + 2 {
            return -1;
        }
        let mut days = vec![0usize; n];
        for (day, &position) in bulbs.iter().enumerate() {
            days[(position - 1) as usize] = day + 1;
        }
        let mut best: i32 = -1;
        // The interior [right-k, right-1] slides one position at a time; the
        // deque keeps indices of strictly increasing day values, so its front
        // is always the interior minimum.
        let mut window: VecDeque<usize> = VecDeque::new();
        for index in 1..k {
            while matches!(window.back(), Some(&back) if days[back] >= days[index]) {
                window.pop_back();
            }
            window.push_back(index);
        }
        for right in k + 1..n {
            let entering = right - 1;
            while matches!(window.back(), Some(&back) if days[back] >= days[entering]) {
                window.pop_back();
            }
            window.push_back(entering);
            while matches!(window.front(), Some(&front) if front < right - k) {
                window.pop_front();
            }
            let pair_day = days[right - k - 1].max(days[right]);
            let interior_clear = k == 0 || days[*window.front().unwrap()] > pair_day;
            if interior_clear && (best == -1 || (pair_day as i32) < best) {
                best = pair_day as i32;
            }
        }
        best
    }
}
