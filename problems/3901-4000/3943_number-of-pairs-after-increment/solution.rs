use std::collections::HashMap;
impl Solution {
    pub fn number_of_pairs(a: Vec<i32>, b: Vec<i32>, qs: Vec<Vec<i32>>) -> Vec<i32> {
        const S: usize = 225;
        let bn = (b.len() + S - 1) / S;
        let mut v: Vec<i64> = b.into_iter().map(i64::from).collect();
        let mut lazy = vec![0i64; bn];
        let mut fs = vec![HashMap::new(); bn];
        fn rebuild(z: usize, v: &mut [i64], lazy: &mut [i64], fs: &mut [HashMap<i64, i32>]) {
            let l = z * S;
            let r = v.len().min(l + S);
            if lazy[z] != 0 {
                for x in &mut v[l..r] {
                    *x += lazy[z];
                }
                lazy[z] = 0;
            }
            fs[z].clear();
            for &x in &v[l..r] {
                *fs[z].entry(x).or_insert(0) += 1;
            }
        }
        for z in 0..bn {
            rebuild(z, &mut v, &mut lazy, &mut fs);
        }
        let mut af = HashMap::new();
        for x in a {
            *af.entry(x).or_insert(0i32) += 1;
        }
        let mut out = vec![];
        for q in qs {
            if q[0] == 1 {
                let (l, r) = (q[1] as usize, q[2] as usize);
                let (bl, br) = (l / S, r / S);
                if bl == br {
                    rebuild(bl, &mut v, &mut lazy, &mut fs);
                    for x in &mut v[l..=r] {
                        *x += q[3] as i64;
                    }
                    rebuild(bl, &mut v, &mut lazy, &mut fs);
                } else {
                    rebuild(bl, &mut v, &mut lazy, &mut fs);
                    for x in &mut v[l..(bl + 1) * S] {
                        *x += q[3] as i64;
                    }
                    rebuild(bl, &mut v, &mut lazy, &mut fs);
                    rebuild(br, &mut v, &mut lazy, &mut fs);
                    for x in &mut v[br * S..=r] {
                        *x += q[3] as i64;
                    }
                    rebuild(br, &mut v, &mut lazy, &mut fs);
                    for z in bl + 1..br {
                        lazy[z] += q[3] as i64;
                    }
                }
            } else {
                let mut z = 0;
                for (&x, &c) in &af {
                    for j in 0..bn {
                        z += c * fs[j].get(&(q[1] as i64 - x as i64 - lazy[j])).copied().unwrap_or(0);
                    }
                }
                out.push(z);
            }
        }
        out
    }
}
