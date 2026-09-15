use std::collections::HashSet;

impl Solution {
    pub fn racecar(target: i32) -> i32 {
        let bound: i64 = 2 * target as i64;
        let span: i64 = 4 * bound + 1;
        // Encode (pos, speed) as an integer key: speed lives in [-2*bound, 2*bound].
        let encode = |pos: i64, speed: i64| (pos + bound) * span + (speed + 2 * bound);
        let mut queue: std::collections::VecDeque<(i64, i64)> = std::collections::VecDeque::new();
        queue.push_back((0, 1));
        let mut visited: HashSet<i64> = HashSet::new();
        visited.insert(encode(0, 1));
        let mut steps: i32 = 0;
        while !queue.is_empty() {
            for _ in 0..queue.len() {
                let (pos, speed) = queue.pop_front().unwrap();
                if pos == target as i64 {
                    return steps;
                }
                // Accelerate.
                let np = pos + speed;
                let ns = speed * 2;
                if -bound <= np && np <= bound && visited.insert(encode(np, ns)) {
                    queue.push_back((np, ns));
                }
                // Reverse.
                let rs: i64 = if speed > 0 { -1 } else { 1 };
                if visited.insert(encode(pos, rs)) {
                    queue.push_back((pos, rs));
                }
            }
            steps += 1;
        }
        -1
    }
}
