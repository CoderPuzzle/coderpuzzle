impl Solution {
    pub fn find_the_distance_value(arr1: Vec<i32>, arr2: Vec<i32>, d: i32) -> i32 {
        let mut sorted2 = arr2.clone();
        sorted2.sort_unstable();
        let mut count = 0;
        for &value in &arr1 {
            let i = sorted2.partition_point(|&x| x < value);
            let mut close = false;
            if i < sorted2.len() && sorted2[i] - value <= d {
                close = true;
            }
            if i > 0 && value - sorted2[i - 1] <= d {
                close = true;
            }
            if !close {
                count += 1;
            }
        }
        count
    }
}
