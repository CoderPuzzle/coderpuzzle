impl Solution {
    pub fn max_value(nums1: Vec<i32>, nums0: Vec<i32>) -> i32 {
        let category = |index: usize| {
            if nums0[index] == 0 {
                0
            } else if nums1[index] == 0 {
                2
            } else {
                1
            }
        };
        let mut order: Vec<usize> = (0..nums1.len()).collect();
        order.sort_by(|&left, &right| {
            category(left).cmp(&category(right)).then_with(|| {
                if category(left) == 1 {
                    nums1[right]
                        .cmp(&nums1[left])
                        .then_with(|| nums0[left].cmp(&nums0[right]))
                } else {
                    std::cmp::Ordering::Equal
                }
            })
        });

        const MODULUS: i64 = 1_000_000_007;
        let mut answer = 0i64;
        for index in order {
            for _ in 0..nums1[index] {
                answer = (answer * 2 + 1) % MODULUS;
            }
            for _ in 0..nums0[index] {
                answer = answer * 2 % MODULUS;
            }
        }
        answer as i32
    }
}
