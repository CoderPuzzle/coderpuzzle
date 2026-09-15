impl Solution {
    pub fn number_of_pairs(nums1: Vec<i32>, nums2: Vec<i32>, k: i32) -> i64 {
        let highest = *nums1.iter().max().unwrap() as i64;
        let mut counts1 = vec![0i64; highest as usize + 1];
        for &num in &nums1 {
            counts1[num as usize] += 1;
        }
        let mut counts2: std::collections::HashMap<i32, i64> = std::collections::HashMap::new();
        for &num in &nums2 {
            *counts2.entry(num).or_insert(0) += 1;
        }
        let mut total: i64 = 0;
        for (&base, &amount) in counts2.iter() {
            let step = base as i64 * k as i64;
            if step > highest {
                continue;
            }
            let mut divisible: i64 = 0;
            let mut value = step;
            while value <= highest {
                divisible += counts1[value as usize];
                value += step;
            }
            total += amount * divisible;
        }
        total
    }
}
