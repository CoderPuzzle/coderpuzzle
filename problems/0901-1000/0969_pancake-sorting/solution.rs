impl Solution {
    pub fn pancake_sort(arr: Vec<i32>) -> Vec<i32> {
        // The pinned answer is a selection sort from the largest value
        // down. For each size s, the unsorted prefix a[..s] still holds
        // exactly the values 1..s, so the value to place is the largest
        // one present. One flip brings it to the front (skipped when it
        // already sits there), the flip with k = s carries it to index
        // s-1, where no later flip — all of which reverse a strictly
        // shorter prefix — can ever reach it again. At most two flips
        // per size, so at most 2*(n-1) in all, well inside the 10*n
        // acceptance bound.
        let mut a = arr;
        let mut flips: Vec<i32> = Vec::with_capacity(2 * a.len());
        for size in (2..=a.len()).rev() {
            let mut idx = 0usize;
            for i in 1..size {
                if a[i] > a[idx] {
                    idx = i;
                }
            }
            if idx == size - 1 {
                continue;
            }
            if idx != 0 {
                flips.push((idx + 1) as i32);
                a[..idx + 1].reverse();
            }
            flips.push(size as i32);
            a[..size].reverse();
        }
        flips
    }
}
