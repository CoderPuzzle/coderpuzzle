impl Solution {
    pub fn replace_elements(arr: Vec<i32>) -> Vec<i32> {
        // Sweep right to left: answer[i] is the max seen strictly right of
        // i, which the running maximum holds before arr[i] joins it.
        let mut answer = vec![-1; arr.len()];
        let mut running_max = -1;
        for i in (0..arr.len()).rev() {
            answer[i] = running_max;
            if arr[i] > running_max {
                running_max = arr[i];
            }
        }
        answer
    }
}
