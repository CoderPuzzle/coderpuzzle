impl Solution {
    // All-even is achievable iff every element is even: an odd element can
    // only become even by subtracting a smaller odd element, which the
    // minimum odd element can never do. All-odd is achievable iff the
    // minimum element is odd, because then every even element can subtract
    // it. So the minimum plus an all-even check decides the whole array in
    // a single pass each.
    pub fn uniform_array(nums1: Vec<i32>) -> bool {
        let smallest = *nums1.iter().min().unwrap();
        if smallest % 2 == 1 {
            return true;
        }
        nums1.iter().all(|&x| x % 2 == 0)
    }
}
