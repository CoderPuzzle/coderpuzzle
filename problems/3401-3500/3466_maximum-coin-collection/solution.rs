impl Solution {
    pub fn max_coins(lane1: Vec<i32>, lane2: Vec<i32>) -> i64 {
        const NEG: i64 = i64::MIN / 4; // sentinel far below any reachable value
        let n = lane1.len();
        // prev1[r] / prev2[r]: best coins for a ride ending at the previous mile,
        // in lane 1 / lane 2, with r lane switches still remaining.
        let mut prev1 = [NEG; 3];
        let mut prev2 = [NEG; 3];
        let mut best = NEG;
        for i in 0..n {
            let v1 = lane1[i] as i64;
            let v2 = lane2[i] as i64;
            let mut cur1 = [NEG; 3];
            let mut cur2 = [NEG; 3];
            // fresh start at mile i (enter on lane 1, may switch immediately)
            cur1[2] = cur1[2].max(v1);
            cur2[1] = cur2[1].max(v2);
            for r in 0..3 {
                if prev1[r] != NEG {
                    cur1[r] = cur1[r].max(prev1[r] + v1); // stay in lane 1
                    if r > 0 {
                        cur2[r - 1] = cur2[r - 1].max(prev1[r] + v2); // switch to lane 2
                    }
                }
                if prev2[r] != NEG {
                    cur2[r] = cur2[r].max(prev2[r] + v2); // stay in lane 2
                    if r > 0 {
                        cur1[r - 1] = cur1[r - 1].max(prev2[r] + v1); // switch to lane 1
                    }
                }
            }
            prev1 = cur1;
            prev2 = cur2;
            for r in 0..3 {
                if prev1[r] > best {
                    best = prev1[r];
                }
                if prev2[r] > best {
                    best = prev2[r];
                }
            }
        }
        best
    }
}
