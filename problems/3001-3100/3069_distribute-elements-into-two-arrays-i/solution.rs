impl Solution {
    pub fn result_array(nums: Vec<i32>) -> Vec<i32> {
        // Literal simulation: seed arr1 with nums[0] and arr2 with nums[1],
        // then route each later element to whichever tail is greater.
        // Distinct values mean the tails never tie, so this is decisive.
        let mut arr1 = vec![nums[0]];
        let mut arr2 = vec![nums[1]];
        for &num in &nums[2..] {
            if arr1.last().unwrap() > arr2.last().unwrap() {
                arr1.push(num);
            } else {
                arr2.push(num);
            }
        }
        arr1.extend(arr2);
        arr1
    }
}
