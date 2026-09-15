impl Solution {
    // Apply next-permutation k times to get the target digits, then the
    // minimum adjacent swaps to rearrange num into it is the inversion
    // count of the order-preserving digit matching.
    pub fn get_min_swaps(num: String, k: i32) -> i32 {
        let n = num.len();
        let mut arr: Vec<i32> = num.bytes().map(|b| (b - b'0') as i32).collect();
        for _ in 0..k {
            Self::next_permutation(&mut arr);
        }
        let mut slots: Vec<Vec<usize>> = vec![Vec::new(); 10];
        for (i, b) in num.bytes().enumerate() {
            slots[(b - b'0') as usize].push(i);
        }
        let mut slot_pos = [0usize; 10];
        let perm: Vec<usize> = (0..n)
            .map(|i| {
                let d = arr[i] as usize;
                let idx = slots[d][slot_pos[d]];
                slot_pos[d] += 1;
                idx
            })
            .collect();

        let mut tree = vec![0i64; n + 1];
        let mut inv: i64 = 0;
        for (i, &idx) in perm.iter().enumerate() {
            let mut less_eq: i64 = 0;
            let mut x = idx;
            while x > 0 {
                less_eq += tree[x];
                x -= x & x.wrapping_neg();
            }
            inv += i as i64 - less_eq;
            let mut x = idx + 1;
            while x <= n {
                tree[x] += 1;
                x += x & x.wrapping_neg();
            }
        }
        inv as i32
    }

    fn next_permutation(a: &mut Vec<i32>) {
        let n = a.len();
        let mut i = n as isize - 2;
        while i >= 0 && a[i as usize] >= a[i as usize + 1] {
            i -= 1;
        }
        let i = i as usize;
        let mut j = n - 1;
        while a[j] <= a[i] {
            j -= 1;
        }
        a.swap(i, j);
        a[i + 1..].reverse();
    }
}
