impl Solution {
    pub fn find_array(pref: Vec<i32>) -> Vec<i32> {
        // arr[i] = pref[i] ^ pref[i-1] for every i (arr[0] = pref[0]), and
        // xor is its own inverse, so the original array falls out of one
        // linear difference pass. Written into a fresh output so the
        // caller's pref is never disturbed.
        let mut arr = Vec::with_capacity(pref.len());
        arr.push(pref[0]);
        for i in 1..pref.len() {
            arr.push(pref[i] ^ pref[i - 1]);
        }
        arr
    }
}
