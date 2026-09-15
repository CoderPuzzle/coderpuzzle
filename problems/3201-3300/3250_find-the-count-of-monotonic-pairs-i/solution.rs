impl Solution {
    pub fn count_of_pairs(nums: Vec<i32>) -> i32 {
        // A pair is fixed once arr1 is chosen (arr2[i] = nums[i] -
        // arr1[i]); its rules collapse onto arr1: 0 <= arr1[i] <=
        // nums[i], arr1 non-decreasing, and arr2 non-increasing, which
        // together give arr1[i] >= arr1[i - 1] + the rise of nums.
        //
        // pref[v] is the inclusive prefix sum of dp over values, so row i
        // reads pref[v - d] per value and is re-summed into the next
        // pref. Every stored value is reduced below 10^9 + 7 first, so a
        // rebuilt entry stays under 2 * (10^9 + 6), which fits in an i32.
        const MOD: i32 = 1_000_000_007;
        let mut pref: Vec<i32> = (0..=nums[0]).map(|v| v + 1).collect();
        for i in 1..nums.len() {
            let d = (nums[i] - nums[i - 1]).max(0) as usize;
            let mut next = vec![0i32; nums[i] as usize + 1];
            let mut acc: i32 = 0;
            for v in 0..=nums[i] as usize {
                let dp = if v >= d { pref[v - d] } else { 0 };
                acc = (acc + dp) % MOD;
                next[v] = acc;
            }
            pref = next;
        }
        *pref.last().unwrap()
    }
}
