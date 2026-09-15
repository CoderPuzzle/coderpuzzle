use std::cmp::min;
use std::collections::HashMap;

impl Solution {
    pub fn beautiful_pair(nums1: Vec<i32>, nums2: Vec<i32>) -> Vec<i32> {
        let n = nums1.len();
        // Identical points sit at distance 0, the instant global minimum,
        // so a duplicate is answered directly from earliest occurrences.
        let mut first_seen: HashMap<i64, usize> = HashMap::new();
        let mut best_j = n as i64;
        let mut best_k = n as i64;
        for i in 0..n {
            let key = nums1[i] as i64 * 100001 + nums2[i] as i64;
            match first_seen.get(&key) {
                None => {
                    first_seen.insert(key, i);
                }
                Some(&j) => {
                    if (j as i64) * (n as i64) + (i as i64) < best_j * (n as i64) + best_k {
                        best_j = j as i64;
                        best_k = i as i64;
                    }
                }
            }
        }
        if best_j < n as i64 {
            return vec![best_j as i32, best_k as i32];
        }

        // Closest pair under Manhattan distance via divide and conquer:
        // the conquer scan walks each strip point forward while the y-gap
        // is under the running bound, so every shorter cross pair is seen.
        fn rec(xs: &[i32], ys: &[i32], idx: &mut [usize], tmp: &mut [usize], left: usize, right: usize) -> i64 {
            if right - left <= 3 {
                let mut delta: i64 = 1 << 60;
                for a in left..right {
                    for b in a + 1..right {
                        delta = min(
                            delta,
                            (xs[idx[a]] - xs[idx[b]]).abs() as i64 + (ys[idx[a]] - ys[idx[b]]).abs() as i64,
                        );
                    }
                }
                idx[left..right].sort_by_key(|&p| ys[p]);
                return delta;
            }
            let mid = left + (right - left) / 2;
            let middle = xs[idx[mid]];
            let mut delta = min(rec(xs, ys, idx, tmp, left, mid), rec(xs, ys, idx, tmp, mid, right));
            idx[left..right].sort_by_key(|&p| ys[p]);
            let mut length = left;
            for pos in left..right {
                if (((xs[idx[pos]] - middle).abs()) as i64) < delta {
                    tmp[length] = idx[pos];
                    length += 1;
                }
            }
            for pos in left..length {
                let mut follow = pos + 1;
                while follow < length && ((ys[tmp[follow]] - ys[tmp[pos]]) as i64) < delta {
                    delta = min(
                        delta,
                        (xs[tmp[pos]] - xs[tmp[follow]]).abs() as i64 + (ys[tmp[pos]] - ys[tmp[follow]]).abs() as i64,
                    );
                    follow += 1;
                }
            }
            delta
        }
        let mut by_x: Vec<usize> = (0..n).collect();
        by_x.sort_by_key(|&i| (nums1[i], nums2[i]));
        let mut tmp = vec![0usize; n];
        let dist = rec(&nums1, &nums2, &mut by_x, &mut tmp, 0, n);
        let dist32 = dist as i32;

        // With minimum distance d the points are pairwise >= d apart, so a
        // d-sided hash grid holds a bounded handful of points per cell and
        // each distance-d edge surfaces exactly once from earlier indices.
        let mut cells: HashMap<i64, Vec<usize>> = HashMap::new();
        for i in 0..n {
            let cx = (nums1[i] / dist32) as i64;
            let cy = (nums2[i] / dist32) as i64;
            for gx in cx - 1..=cx + 1 {
                for gy in cy - 1..=cy + 1 {
                    if let Some(bucket) = cells.get(&(gx * 200003 + gy)) {
                        for &j in bucket {
                            let gap = (nums1[i] - nums1[j]).abs() + (nums2[i] - nums2[j]).abs();
                            if gap == dist32 && (j as i64) < best_j {
                                best_j = j as i64;
                                best_k = i as i64;
                            }
                        }
                    }
                }
            }
            cells.entry(cx * 200003 + cy).or_default().push(i);
        }
        vec![best_j as i32, best_k as i32]
    }
}
