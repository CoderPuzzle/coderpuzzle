impl Solution {
    pub fn transform_str(s: String, qs: Vec<String>) -> Vec<bool> {
        let sb = s.as_bytes();
        let total = sb.iter().filter(|&&x| x == b'1').count() as i32;
        qs.into_iter()
            .map(|q| {
                let b = q.as_bytes();
                let mut need = total - b.iter().filter(|&&x| x == b'1').count() as i32;
                let wild = b.iter().filter(|&&x| x == b'?').count() as i32;
                if need < 0 || need > wild {
                    return false;
                }
                let mut one = vec![false; b.len()];
                for i in (0..b.len()).rev() {
                    if b[i] == b'?' && need > 0 {
                        one[i] = true;
                        need -= 1
                    }
                }
                let (mut a, mut c) = (0, 0);
                for i in 0..b.len() {
                    a += (sb[i] == b'1') as i32;
                    c += (b[i] == b'1' || one[i]) as i32;
                    if c > a {
                        return false;
                    }
                }
                true
            })
            .collect()
    }
}
