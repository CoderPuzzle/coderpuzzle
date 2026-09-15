struct SmallerNumbersThanCurrent;

impl SmallerNumbersThanCurrent {
    fn new() -> Self {
        SmallerNumbersThanCurrent
    }

    pub fn smaller_numbers_than_current(&self, nums: Vec<i32>) -> Vec<i32> {
        let mut counts = [0i32; 101];
        for &v in &nums {
            counts[v as usize] += 1;
        }
        for v in 1..=100usize {
            counts[v] += counts[v - 1];
        }
        let mut below = [0i32; 101];
        for v in 1..=100usize {
            below[v] = counts[v - 1];
        }
        nums.iter().map(|&v| below[v as usize]).collect()
    }
}
