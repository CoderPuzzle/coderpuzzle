impl Solution {
    pub fn max_distance(side: i32, points: Vec<Vec<i32>>, k: i32) -> i32 {
        let side = side as i64;
        let k = k as usize;
        let l = 4i64 * side;

        let perimeter = |x: i64, y: i64| -> i64 {
            if y == 0 {
                return x;
            }
            if x == side {
                return side + y;
            }
            if y == side {
                return 2 * side + (side - x);
            }
            // x == 0
            3 * side + (side - y)
        };

        let n = points.len();
        let mut coords: Vec<i64> = points.iter().map(|p| perimeter(p[0] as i64, p[1] as i64)).collect();
        coords.sort_unstable();
        let mut arr: Vec<i64> = Vec::with_capacity(2 * n);
        arr.extend_from_slice(&coords);
        for &c in &coords {
            arr.push(c + l);
        }

        let feasible = |d: i64| -> bool {
            if d == 0 {
                return true;
            }
            let total = 2 * n;
            let mut nxt = vec![0usize; total];
            for j in 0..total {
                let target = arr[j] + d;
                // first index >= j+1 with arr[idx] >= target
                let mut lo = j + 1;
                let mut hi = total;
                while lo < hi {
                    let mid = (lo + hi) / 2;
                    if arr[mid] < target {
                        lo = mid + 1;
                    } else {
                        hi = mid;
                    }
                }
                nxt[j] = lo;
            }
            for i in 0..n {
                let mut cnt = 1usize;
                let mut cur = i;
                let mut ok = true;
                for _ in 0..(k - 1) {
                    let j = nxt[cur];
                    if j >= i + n {
                        ok = false;
                        break;
                    }
                    cur = j;
                    cnt += 1;
                }
                if ok && cnt == k {
                    if arr[cur] + d <= arr[i] + l {
                        return true;
                    }
                }
            }
            false
        };

        let mut lo: i64 = 0;
        let mut hi: i64 = 2 * side;
        while lo < hi {
            let mid = lo + (hi - lo + 1) / 2;
            if feasible(mid) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        lo as i32
    }
}
