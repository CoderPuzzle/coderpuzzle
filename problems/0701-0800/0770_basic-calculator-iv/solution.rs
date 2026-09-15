use std::collections::HashMap;

// One scan, two stacks: a stack of polynomials — each a map from a term
// (its variables, sorted, joined by '*'; "" is the constant term) to its
// coefficient — and a stack of pending operators. Every operand pushes a
// one-term polynomial; a variable listed in evalvars (or a number)
// becomes the constant term. '+' and '-' drain every pending operator
// down to '(', '*' drains only '*', and ')' drains to its matching '(' —
// precedence and brackets in four rules. Multiplying pairs every term of
// both sides, merging the two variable lists into one sorted list;
// adding merges coefficients of equal terms. Zero terms drop out at the
// end, where terms print degree-descending first and lexicographic
// within a degree, coefficient left of its variables.
fn apply(polys: &mut Vec<HashMap<String, i64>>, ops: &mut Vec<u8>) {
    let op = ops.pop().unwrap();
    let right = polys.pop().unwrap();
    let mut left = polys.pop().unwrap();
    if op == b'*' {
        let mut product: HashMap<String, i64> = HashMap::new();
        for (lkey, lcoef) in &left {
            let lvars: Vec<&str> = split_term(lkey);
            for (rkey, rcoef) in &right {
                let mut merged: Vec<&str> = lvars.clone();
                merged.extend(split_term(rkey));
                merged.sort();
                let key = merged.join("*");
                *product.entry(key).or_insert(0) += lcoef * rcoef;
            }
        }
        polys.push(product);
    } else {
        let sign: i64 = if op == b'+' { 1 } else { -1 };
        for (key, coef) in &right {
            *left.entry(key.clone()).or_insert(0) += sign * coef;
        }
        polys.push(left);
    }
}

fn split_term(key: &str) -> Vec<&str> {
    if key.is_empty() {
        Vec::new()
    } else {
        key.split('*').collect()
    }
}

fn degree(key: &str) -> usize {
    if key.is_empty() {
        0
    } else {
        key.matches('*').count() + 1
    }
}

impl Solution {
    pub fn basic_calculator_iv(expression: String, evalvars: Vec<String>, evalints: Vec<i32>) -> Vec<String> {
        let mut evalmap: HashMap<&str, i64> = HashMap::new();
        for (name, value) in evalvars.iter().zip(evalints.iter()) {
            evalmap.insert(name.as_str(), i64::from(*value));
        }
        let bytes = expression.as_bytes();
        let mut polys: Vec<HashMap<String, i64>> = Vec::new();
        let mut ops: Vec<u8> = Vec::new();
        let mut i = 0;
        while i < bytes.len() {
            let ch = bytes[i];
            match ch {
                b' ' => i += 1,
                b'(' => {
                    ops.push(b'(');
                    i += 1;
                }
                b')' => {
                    while *ops.last().unwrap() != b'(' {
                        apply(&mut polys, &mut ops);
                    }
                    ops.pop();
                    i += 1;
                }
                b'+' | b'-' | b'*' => {
                    while !ops.is_empty() {
                        let top = *ops.last().unwrap();
                        if ch == b'*' {
                            if top != b'*' {
                                break;
                            }
                        } else if top == b'(' {
                            break;
                        }
                        apply(&mut polys, &mut ops);
                    }
                    ops.push(ch);
                    i += 1;
                }
                _ => {
                    let start = i;
                    while i < bytes.len() && bytes[i].is_ascii_alphanumeric() {
                        i += 1;
                    }
                    let token = std::str::from_utf8(&bytes[start..i]).unwrap();
                    let mut poly: HashMap<String, i64> = HashMap::new();
                    if token.chars().next().unwrap().is_ascii_digit() {
                        poly.insert(String::new(), token.parse::<i64>().unwrap());
                    } else if let Some(value) = evalmap.get(token) {
                        poly.insert(String::new(), *value);
                    } else {
                        poly.insert(token.to_string(), 1);
                    }
                    polys.push(poly);
                }
            }
        }
        while !ops.is_empty() {
            apply(&mut polys, &mut ops);
        }
        let result = polys.pop().unwrap();
        let mut terms: Vec<(&str, i64)> = result
            .iter()
            .filter(|(_, coef)| **coef != 0)
            .map(|(key, coef)| (key.as_str(), *coef))
            .collect();
        terms.sort_by(|a, b| degree(b.0).cmp(&degree(a.0)).then_with(|| a.0.cmp(b.0)));
        terms
            .iter()
            .map(|(key, coef)| {
                if key.is_empty() {
                    coef.to_string()
                } else {
                    format!("{}*{}", coef, key)
                }
            })
            .collect()
    }
}
