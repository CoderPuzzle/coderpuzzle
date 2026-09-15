impl Solution {
    // Every reachable i contributes the interval [i+minJump, i+maxJump],
    // so "some source reaches j" is a range-count query; a rolling
    // prefix sum over reach[] answers it in O(1) per position.
    pub fn can_reach(s: String, min_jump: i32, max_jump: i32) -> bool {
        let n = s.len();
        let s = s.as_bytes();
        let mut pre = vec![0i32; n + 1];
        pre[1] = 1; // index 0 is reachable by definition
        for i in 1..n {
            let mut ok = false;
            if s[i] == b'0' && i as i32 >= min_jump {
                let hi = i as i64 - min_jump as i64;
                let lo = (i as i64 - max_jump as i64).max(0);
                ok = pre[(hi + 1) as usize] - pre[lo as usize] > 0;
            }
            pre[i + 1] = pre[i] + if ok { 1 } else { 0 };
        }
        pre[n] > pre[n - 1]
    }
}
