impl Solution {
    pub fn check_arithmetic_subarrays(nums: Vec<i32>, l: Vec<i32>, r: Vec<i32>) -> Vec<bool> {
        let mut answer = Vec::with_capacity(l.len());
        for qi in 0..l.len() {
            // A set of numbers can be rearranged into an arithmetic
            // sequence exactly when its sorted order already is one.
            let mut sub: Vec<i32> = nums[l[qi] as usize..=r[qi] as usize].to_vec();
            sub.sort();
            let diff = sub[1] - sub[0];
            let mut ok = true;
            for i in 2..sub.len() {
                if sub[i] - sub[i - 1] != diff {
                    ok = false;
                    break;
                }
            }
            answer.push(ok);
        }
        answer
    }
}
