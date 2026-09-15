impl Solution {
    // All-even needs 0 odd elements, or at least 2 so each odd can
    // subtract another odd; all-odd needs at least one odd for the even
    // elements to subtract. One of the two always holds.
    pub fn uniform_array(nums1: Vec<i32>) -> bool {
        let odd = nums1.iter().filter(|&&x| x % 2 == 1).count();
        let all_even_ok = odd == 0 || odd >= 2;
        let all_odd_ok = odd >= 1;
        all_even_ok || all_odd_ok
    }
}
