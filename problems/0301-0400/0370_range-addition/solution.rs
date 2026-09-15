impl Solution {
    pub fn get_modified_array(length: i32, updates: Vec<Vec<i32>>) -> Vec<i32> {
        let length = length as usize;
        // Record only where the running total changes: +inc at start,
        // -inc just past end. The extra slot makes end+1 safe at the
        // last index.
        let mut diff = vec![0i64; length + 1];
        for u in &updates {
            diff[u[0] as usize] += u[2] as i64;
            diff[u[1] as usize + 1] -= u[2] as i64;
        }
        // One prefix-sum sweep: position i sees exactly the updates whose
        // ranges still cover it.
        let mut arr = vec![0i32; length];
        let mut cur: i64 = 0;
        for i in 0..length {
            cur += diff[i];
            arr[i] = cur as i32;
        }
        arr
    }
}
