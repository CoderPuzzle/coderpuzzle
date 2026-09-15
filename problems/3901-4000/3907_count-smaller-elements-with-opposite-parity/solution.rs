impl Solution {
    pub fn count_smaller_opposite_parity(nums: Vec<i32>) -> Vec<i32> {
        let mut values = nums.clone();
        values.sort_unstable();
        values.dedup();
        let mut trees = vec![vec![0i32; values.len() + 1]; 2];
        let mut answer = vec![0i32; nums.len()];

        for i in (0..nums.len()).rev() {
            let rank = values.binary_search(&nums[i]).unwrap() + 1;
            let parity = (nums[i] & 1) as usize;
            answer[i] = Self::query(&trees[parity ^ 1], rank - 1);
            Self::update(&mut trees[parity], rank);
        }
        answer
    }

    fn query(tree: &[i32], mut index: usize) -> i32 {
        let mut total = 0;
        while index > 0 {
            total += tree[index];
            index -= index & index.wrapping_neg();
        }
        total
    }

    fn update(tree: &mut [i32], mut index: usize) {
        while index < tree.len() {
            tree[index] += 1;
            index += index & index.wrapping_neg();
        }
    }
}
