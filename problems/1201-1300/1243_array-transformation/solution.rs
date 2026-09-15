impl Solution {
    pub fn transform_array(arr: Vec<i32>) -> Vec<i32> {
        let mut current = arr;
        loop {
            // Whole day from a snapshot: neighbors are yesterday's values.
            let mut next = current.clone();
            for i in 1..current.len() - 1 {
                if current[i] < current[i - 1] && current[i] < current[i + 1] {
                    next[i] = current[i] + 1;
                } else if current[i] > current[i - 1] && current[i] > current[i + 1] {
                    next[i] = current[i] - 1;
                }
            }
            if next == current {
                return current;
            }
            current = next;
        }
    }
}
