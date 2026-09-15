impl Solution {
    pub fn max_height(cuboids: Vec<Vec<i32>>) -> i32 {
        // Rotations are free, so sort each cuboid's dimensions — largest up
        // is simultaneously tallest and least constrained — then sort the
        // cuboids lexicographically so a potential base precedes its tippers.
        let mut boxes = cuboids;
        for b in boxes.iter_mut() {
            b.sort();
        }
        boxes.sort();
        let n = boxes.len();
        // dp[i]: tallest stack with cuboid i on top.
        let mut dp = vec![0i32; n];
        let mut best = 0;
        for i in 0..n {
            dp[i] = boxes[i][2];
            // An earlier j whose sorted triple is component-wise <= i's can
            // support it (non-strict: equal dimensions may touch).
            for j in 0..i {
                if boxes[j][0] <= boxes[i][0]
                    && boxes[j][1] <= boxes[i][1]
                    && boxes[j][2] <= boxes[i][2]
                    && dp[j] + boxes[i][2] > dp[i]
                {
                    dp[i] = dp[j] + boxes[i][2];
                }
            }
            best = best.max(dp[i]);
        }
        best
    }
}
