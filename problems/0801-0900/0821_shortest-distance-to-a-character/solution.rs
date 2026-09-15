impl Solution {
    pub fn shortest_to_char(s: String, c: String) -> Vec<i32> {
        // Two passes over s. Forward, each cell records its distance to the
        // nearest c at or before it; backward, the mirrored sweep offers the
        // distance to the nearest c at or after it, kept only where it beats
        // what the forward pass wrote. A cell that is itself c lands on 0 in
        // both sweeps, and the sentinels (-n, 2n) stand in for "no c seen
        // yet" with a distance no real neighbour can lose to.
        let s = s.as_bytes();
        let target = c.as_bytes()[0];
        let n = s.len() as i32;
        let mut answer = vec![0; s.len()];
        let mut last = -n;
        for i in 0..s.len() {
            if s[i] == target {
                last = i as i32;
            }
            answer[i] = i as i32 - last;
        }
        let mut last = 2 * n;
        for i in (0..s.len()).rev() {
            if s[i] == target {
                last = i as i32;
            }
            let backward = last - i as i32;
            if backward < answer[i] {
                answer[i] = backward;
            }
        }
        answer
    }
}
