impl Solution {
    pub fn find_kth_positive(arr: Vec<i32>, k: i32) -> i32 {
        // Read the absent positives straight off the array, gap by gap:
        // every integer strictly between prev and v is absent, so the gap
        // holds exactly v - prev - 1 of them.
        let mut k = k;
        let mut prev = 0;
        for v in arr {
            let gap = v - prev - 1;
            if k <= gap {
                // The kth still-owed absent positive sits k integers past
                // prev, inside the gap just reached.
                return prev + k;
            }
            k -= gap;
            prev = v;
        }
        // The walk never broke, so the absent positives left owed run
        // consecutively past the last element.
        prev + k
    }
}
