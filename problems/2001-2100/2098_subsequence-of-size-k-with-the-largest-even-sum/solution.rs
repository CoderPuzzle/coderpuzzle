impl Solution {
    pub fn largest_even_sum(mut nums: Vec<i32>, k: i32) -> i64 {
        nums.sort_unstable_by(|a, b| b.cmp(a));
        let k = k as usize;
        let mut total = 0_i64;
        let mut smallest_selected = [-1_i32; 2];
        for &value in &nums[..k] {
            total += value as i64;
            smallest_selected[value as usize % 2] = value;
        }
        if total % 2 == 0 {
            return total;
        }

        let mut largest_unselected = [-1_i32; 2];
        for &value in &nums[k..] {
            let parity = value as usize % 2;
            if largest_unselected[parity] == -1 {
                largest_unselected[parity] = value;
            }
        }

        let mut answer = -1_i64;
        for parity in 0..2 {
            if smallest_selected[parity] != -1 && largest_unselected[1 - parity] != -1 {
                answer = answer.max(total - smallest_selected[parity] as i64 + largest_unselected[1 - parity] as i64);
            }
        }
        answer
    }
}
