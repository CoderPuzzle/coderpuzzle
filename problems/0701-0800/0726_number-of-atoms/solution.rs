use std::collections::HashMap;

// Scan the formula once with an explicit stack of count maps. '(' opens a
// fresh map; an element name — one uppercase letter plus any lowercase run —
// lands its count (implicit 1) in the top map; ')' pops the top map, reads
// the optional trailing multiplier, and folds every atom into the parent
// scaled by it. The bottom map left at the end holds the totals, written in
// sorted name order with counts of 1 omitted.
fn read_count(f: &[u8], i: &mut usize) -> i64 {
    let start = *i;
    while *i < f.len() && f[*i].is_ascii_digit() {
        *i += 1;
    }
    if *i == start {
        1
    } else {
        std::str::from_utf8(&f[start..*i]).unwrap().parse().unwrap()
    }
}

impl Solution {
    pub fn count_of_atoms(formula: String) -> String {
        let f = formula.as_bytes();
        let mut stack: Vec<HashMap<String, i64>> = vec![HashMap::new()];
        let mut i = 0;
        while i < f.len() {
            match f[i] {
                b'(' => {
                    stack.push(HashMap::new());
                    i += 1;
                }
                b')' => {
                    i += 1;
                    let mult = read_count(f, &mut i);
                    let group = stack.pop().unwrap();
                    let top = stack.last_mut().unwrap();
                    for (name, cnt) in group {
                        *top.entry(name).or_insert(0) += cnt * mult;
                    }
                }
                _ => {
                    let start = i;
                    i += 1;
                    while i < f.len() && f[i].is_ascii_lowercase() {
                        i += 1;
                    }
                    let name = std::str::from_utf8(&f[start..i]).unwrap().to_string();
                    let cnt = read_count(f, &mut i);
                    let top = stack.last_mut().unwrap();
                    *top.entry(name).or_insert(0) += cnt;
                }
            }
        }
        let counts = stack.pop().unwrap();
        let mut names: Vec<&String> = counts.keys().collect();
        names.sort();
        let mut out = String::new();
        for name in names {
            out.push_str(name);
            let cnt = counts[name];
            if cnt > 1 {
                out.push_str(&cnt.to_string());
            }
        }
        out
    }
}
