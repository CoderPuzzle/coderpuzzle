impl Solution {
    pub fn split_looped_string(strs: Vec<String>) -> String {
        // Every string except the breakpoint carrier stands at max(s, s
        // reversed) - fixed slot lengths make per-string maxima optimal.
        // The breakpoint string itself is tried in BOTH orientations at
        // every cut, its suffix leading the regular string and its prefix
        // closing it, wrapped around the others' standing forms in loop
        // order.
        let n = strs.len();
        let best: Vec<String> = strs
            .iter()
            .map(|s| {
                let rev: String = s.chars().rev().collect();
                if s.as_str() > rev.as_str() {
                    s.clone()
                } else {
                    rev
                }
            })
            .collect();
        let mut ans = String::new();
        for i in 0..n {
            let rest: String = (1..n).map(|j| best[(i + j) % n].as_str()).collect();
            let rev: String = strs[i].chars().rev().collect();
            for t in [strs[i].as_str(), rev.as_str()] {
                for k in 0..t.len() {
                    let cand = format!("{}{}{}", &t[k..], rest, &t[..k]);
                    if cand > ans {
                        ans = cand;
                    }
                }
            }
        }
        ans
    }
}
