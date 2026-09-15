impl Solution {
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        let mut arr = nums;
        let n = arr.len();
        let mut operations: i32 = 0;
        // The leftmost 0 can only be fixed by the one flip starting there, so
        // every position whose running value is 0 forces exactly one operation.
        for i in 0..n {
            if i + 2 >= n {
                break;
            }
            if arr[i] == 0 {
                operations += 1;
                arr[i] ^= 1;
                arr[i + 1] ^= 1;
                arr[i + 2] ^= 1;
            }
        }
        // The sweep leaves positions 0..n-3 all 1; the last two cells can no
        // longer be operated on, so a surviving 0 means the array is unfixable.
        if arr.contains(&0) {
            return -1;
        }
        // Each counted flip was forced, so no cheaper sequence of flips exists.
        operations
    }
}
