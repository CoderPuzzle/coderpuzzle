impl Solution {
    pub fn max_jump(stones: Vec<i32>) -> i32 {
        // The round trip splits into two interleaved routes sharing both
        // endpoints: outbound lands on every other stone, return picks up
        // the skipped ones. Each interior stone's worst-case hop is then
        // to the second neighbor, so the bottleneck jump is the maximum
        // of stones[i] - stones[i-2], floored by the opening hop.
        let mut best = stones[1] - stones[0];
        for i in 2..stones.len() {
            let gap = stones[i] - stones[i - 2];
            if gap > best {
                best = gap;
            }
        }
        best
    }
}
