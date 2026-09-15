impl Solution {
    pub fn min_cost(colors: String, neededTime: Vec<i32>) -> i32 {
        let colors: Vec<u8> = colors.into_bytes();
        let mut total = 0;
        let mut run_sum = neededTime[0];
        let mut run_max = neededTime[0];
        for i in 1..colors.len() {
            if colors[i] == colors[i - 1] {
                run_sum += neededTime[i];
                run_max = run_max.max(neededTime[i]);
            } else {
                total += run_sum - run_max;
                run_sum = neededTime[i];
                run_max = neededTime[i];
            }
        }
        total += run_sum - run_max;
        total
    }
}
