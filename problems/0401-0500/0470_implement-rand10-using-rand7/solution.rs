impl Solution {
    pub fn rand10(rand7_outputs: Vec<i32>) -> i32 {
        let mut index = 0usize;
        loop {
            let a = rand7_outputs[index];
            let b = rand7_outputs[index + 1];
            index += 2;
            // Two independent draws give 49 equally likely pairs folded
            // into idx, uniform over 1..49.
            let idx = (a - 1) * 7 + b;
            // 40 is the largest multiple of 10 under 49, so each output
            // class owns exactly four indices; pairs 41..49 are rejected
            // wholesale, which keeps the mapping unbiased.
            if idx <= 40 {
                return (idx - 1) % 10 + 1;
            }
        }
    }
}
