use std::collections::HashSet;

impl Solution {
    // Per (parity, sum) we keep every reachable product <= limit, not just
    // the maximum: a larger product can blow past limit on a later multiply
    // while a smaller one survives. Product-0 reachability is tracked
    // separately, since a 0 can only be reached through a subsequence
    // containing a zero, even via products above the limit.
    pub fn max_product(nums: Vec<i32>, k: i32, limit: i32) -> i32 {
        let total: i32 = nums.iter().sum();
        if k.abs() > total {
            return -1;
        }
        let width = (2 * total + 1) as usize;
        let mut products: Vec<Vec<HashSet<i32>>> = vec![vec![HashSet::new(); width]; 2];
        let mut zero = vec![vec![false; width]; 2];
        let mut reach = vec![vec![false; width]; 2];
        for &x in &nums {
            let mut np = products.clone();
            let mut nz = zero.clone();
            let mut nr = reach.clone();
            for p in 0..2 {
                let sign = if p == 0 { 1 } else { -1 };
                let q = 1 - p;
                for i in 0..width {
                    let s = i as i32 - total;
                    let ns = s + sign * x;
                    if ns < -total || ns > total {
                        continue;
                    }
                    let j = (ns + total) as usize;
                    if reach[p][i] {
                        nr[q][j] = true;
                        if x == 0 {
                            nz[q][i] = true;
                        } else {
                            for &prod in &products[p][i] {
                                let newp = prod * x;
                                if newp <= limit {
                                    np[q][j].insert(newp);
                                }
                            }
                        }
                    }
                    if zero[p][i] {
                        nz[q][j] = true;
                    }
                }
            }
            // A fresh subsequence with x as its single (even-index) element.
            if x == 0 {
                nz[1][total as usize] = true;
                nr[1][total as usize] = true;
            } else {
                nr[1][(x + total) as usize] = true;
                if x <= limit {
                    np[1][(x + total) as usize].insert(x);
                }
            }
            products = np;
            zero = nz;
            reach = nr;
        }
        let mut ans = -1;
        let idx = (k + total) as usize;
        if idx < width {
            for p in 0..2 {
                for &prod in &products[p][idx] {
                    if prod > ans {
                        ans = prod;
                    }
                }
                if zero[p][idx] && ans < 0 {
                    ans = 0;
                }
            }
        }
        ans
    }
}
