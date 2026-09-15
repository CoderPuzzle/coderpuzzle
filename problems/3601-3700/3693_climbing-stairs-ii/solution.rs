impl Solution {
    pub fn climb_stairs(n: i32, costs: Vec<i32>) -> i64 {
        // prev1/prev2/prev3 are the cheapest ways to stand on the three
        // steps below the current one. Step 0 is free; the steps below it
        // do not exist, so their sentinel costs price step 1 out of long
        // opening jumps.
        const INF: i64 = 1i64 << 60;
        let mut prev1 = 0i64;
        let mut prev2 = INF;
        let mut prev3 = INF;
        for j in 1..=n as usize {
            let land = costs[j - 1] as i64;
            // The final hop covered d steps for some d in 1..3, paying the
            // landing fee plus the squared jump length.
            let cur = (prev1 + land + 1).min(prev2 + land + 4).min(prev3 + land + 9);
            prev3 = prev2;
            prev2 = prev1;
            prev1 = cur;
        }
        prev1
    }
}
