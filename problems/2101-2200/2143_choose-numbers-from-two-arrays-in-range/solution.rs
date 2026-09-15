impl Solution {
    pub fn count_subranges(nums1: Vec<i32>, nums2: Vec<i32>) -> i32 {
        const MODULO: i32 = 1_000_000_007;
        const OFFSET: usize = 10_000;
        const SIZE: usize = 20_001;
        let mut previous = vec![0_i32; SIZE];
        let mut answer = 0_i32;
        for index in 0..nums1.len() {
            let first = nums1[index] as usize;
            let second = nums2[index] as usize;
            let mut current = vec![0_i32; SIZE];
            current[OFFSET + first] = 1;
            current[OFFSET - second] = (current[OFFSET - second] + 1) % MODULO;
            for position in 0..SIZE {
                let count = previous[position];
                if count == 0 {
                    continue;
                }
                if position + first < SIZE {
                    current[position + first] = (current[position + first] + count) % MODULO;
                }
                if position >= second {
                    current[position - second] = (current[position - second] + count) % MODULO;
                }
            }
            answer = (answer + current[OFFSET]) % MODULO;
            previous = current;
        }
        answer
    }
}
