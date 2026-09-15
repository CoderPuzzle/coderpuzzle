impl Solution {
    // Fill nums1 from the back so the largest elements land last: the n tail
    // slots are declared scratch, and a write at m+n-1 moving down can never
    // pass an unread nums1 element.
    pub fn merge(nums1: Vec<i32>, m: i32, nums2: Vec<i32>, n: i32) -> Vec<i32> {
        let mut nums1 = nums1;
        // i and j count unread elements in each prefix, so write is i + j - 1.
        let (mut i, mut j) = (m as usize, n as usize);
        while j > 0 {
            let write = i + j - 1;
            if i > 0 && nums1[i - 1] > nums2[j - 1] {
                i -= 1;
                nums1[write] = nums1[i];
            } else {
                j -= 1;
                nums1[write] = nums2[j];
            }
        }
        // nums2 is exhausted: any nums1 prefix left unread is already in place.
        nums1
    }
}
