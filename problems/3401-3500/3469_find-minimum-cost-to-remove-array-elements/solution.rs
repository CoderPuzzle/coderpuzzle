impl Solution {
    pub fn min_cost(nums: Vec<i32>) -> i64 {
        // Every operation removes two of the three frontmost elements, so
        // what remains is always an untouched suffix plus at most one
        // element left behind in front of it. Row j holds, at index c + 1,
        // the cheapest finish when nums[c] is that leftover (index 0 =
        // no leftover); computing row j reads only rows j + 2 and j + 3,
        // so a three-row ring bounds the table at O(n) memory. Costs sum
        // to at most 5 * 10^8, far inside i64 range.
        let n = nums.len();
        if n < 3 {
            return nums[0].max(nums[n - 1]) as i64;
        }

        let v64: Vec<i64> = nums.iter().map(|&x| x as i64).collect();
        let mut row_n = vec![0_i64; n + 1];
        for c in 0..n {
            row_n[c + 1] = v64[c];
        }
        let mut row_nm1 = vec![0_i64; n];
        row_nm1[0] = v64[n - 1];
        for c in 0..n - 1 {
            row_nm1[c + 1] = v64[c].max(v64[n - 1]);
        }
        let mut row_nm2 = vec![0_i64; n - 1];
        row_nm2[0] = v64[n - 2].max(v64[n - 1]);
        for c in 0..n - 2 {
            let (a, b, d) = (v64[c], v64[n - 2], v64[n - 1]);
            row_nm2[c + 1] = (a.max(b) + d).min(a.max(d) + b).min(b.max(d) + a);
        }

        let mut ring: Vec<Vec<i64>> = vec![row_nm2, row_nm1, row_n];
        for j in (0..=n - 3).rev() {
            let r2 = &ring[1];
            let r3 = &ring[2];
            let a = v64[j];
            let b = v64[j + 1];
            let pair = a.max(b);
            let mut row = vec![0_i64; j + 1];
            // No leftover: nums[j], nums[j+1], nums[j+2] meet one
            // operation and the survivor becomes the next leftover.
            row[0] = (b.max(v64[j + 2]) + r3[j + 1])
                .min(a.max(v64[j + 2]) + r3[j + 2])
                .min(pair + r3[j + 3]);
            // With leftover nums[c]: the front three are nums[c], a, b.
            let k1 = r2[j + 2];
            let k2 = r2[j + 1];
            for c in 0..j {
                let v = v64[c];
                row[c + 1] = (v.max(a) + k1).min(v.max(b) + k2).min(pair + r2[c + 1]);
            }
            ring[2] = ring[1].clone();
            ring[1] = ring[0].clone();
            ring[0] = row;
        }
        ring[0][0]
    }
}
