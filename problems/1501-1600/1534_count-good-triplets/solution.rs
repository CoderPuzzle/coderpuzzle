impl Solution {
    pub fn count_good_triplets(arr: Vec<i32>, a: i32, b: i32, c: i32) -> i32 {
        // n is capped at 100, so the naive O(n^3) triple loop is intended:
        // walk every ordered index triple i < j < k and test the three
        // pairwise bounds directly.
        let n = arr.len();
        let mut count = 0;
        for i in 0..n {
            for j in (i + 1)..n {
                if (arr[i] - arr[j]).abs() > a {
                    continue;
                }
                for k in (j + 1)..n {
                    if (arr[j] - arr[k]).abs() <= b && (arr[i] - arr[k]).abs() <= c {
                        count += 1;
                    }
                }
            }
        }
        count
    }
}
