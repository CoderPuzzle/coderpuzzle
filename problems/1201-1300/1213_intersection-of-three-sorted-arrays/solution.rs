impl Solution {
    pub fn arrays_intersection(arr1: Vec<i32>, arr2: Vec<i32>, arr3: Vec<i32>) -> Vec<i32> {
        // One index per sorted array; the smallest current values can never
        // reappear ahead, so they are safe to step past.
        let (mut i, mut j, mut k) = (0usize, 0usize, 0usize);
        let mut out = Vec::new();
        while i < arr1.len() && j < arr2.len() && k < arr3.len() {
            let (a, b, c) = (arr1[i], arr2[j], arr3[k]);
            if a == b && b == c {
                out.push(a);
                i += 1;
                j += 1;
                k += 1;
                continue;
            }
            let smallest = a.min(b).min(c);
            if a == smallest {
                i += 1;
            }
            if b == smallest {
                j += 1;
            }
            if c == smallest {
                k += 1;
            }
        }
        out
    }
}
