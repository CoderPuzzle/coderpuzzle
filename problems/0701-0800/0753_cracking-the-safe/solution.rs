impl Solution {
    pub fn crack_safe(n: i32, k: i32) -> String {
        let n = n as usize;
        let k = k as usize;
        // Iterative Hierholzer over the de Bruijn graph: nodes are (n-1)-digit
        // strings (as base-k integers), edges are the k^n passwords. Digits are
        // tried in ascending order, matching the reference's deterministic walk.
        let total = kusize_pow(k, n);
        let shift = kusize_pow(k, n.saturating_sub(1));
        let mut seen = vec![false; total];
        let mut out = String::new();
        let mut node_stack: Vec<usize> = vec![0];
        let mut digit_stack: Vec<usize> = vec![0]; // digit used to enter each stacked node
        while let Some(&node) = node_stack.last() {
            let mut nxt: i64 = -1;
            for x in 0..k {
                let e = node * k + x;
                if !seen[e] {
                    seen[e] = true;
                    nxt = x as i64;
                    break;
                }
            }
            if nxt >= 0 {
                let nxt = nxt as usize;
                node_stack.push((node * k + nxt) % shift);
                digit_stack.push(nxt);
            } else {
                node_stack.pop();
                let d = digit_stack.pop().unwrap();
                if !node_stack.is_empty() {
                    out.push((b'0' + d as u8) as char);
                }
            }
        }
        out.push_str(&"0".repeat(n - 1));
        out
    }
}

fn kusize_pow(k: usize, e: usize) -> usize {
    let mut r = 1usize;
    for _ in 0..e {
        r *= k;
    }
    r
}
