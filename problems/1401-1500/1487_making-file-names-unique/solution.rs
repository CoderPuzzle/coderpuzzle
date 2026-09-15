use std::collections::HashMap;
use std::collections::HashSet;

impl Solution {
    pub fn get_folder_names(names: Vec<String>) -> Vec<String> {
        let mut used: HashSet<String> = HashSet::new();
        let mut next_k: HashMap<String, i64> = HashMap::new();
        let mut result = Vec::with_capacity(names.len());
        for name in &names {
            if !used.contains(name) {
                used.insert(name.clone());
                next_k.entry(name.clone()).or_insert(1);
                result.push(name.clone());
                continue;
            }
            let base = name.as_str();
            let mut k = *next_k.get(base).unwrap_or(&1);
            let mut candidate = format!("{}({})", base, k);
            while used.contains(&candidate) {
                k += 1;
                candidate = format!("{}({})", base, k);
            }
            used.insert(candidate.clone());
            next_k.insert(base.to_string(), k + 1);
            if candidate.ends_with(')') {
                if let Some(idx) = candidate.rfind('(') {
                    if idx > 0 {
                        let digits = &candidate[idx + 1..candidate.len() - 1];
                        if !digits.is_empty() && digits.bytes().all(|c| c.is_ascii_digit()) {
                            let stem = candidate[..idx].to_string();
                            let val: i64 = digits.parse::<i64>().unwrap() + 1;
                            let cur = *next_k.get(&stem).unwrap_or(&1);
                            if cur < val {
                                next_k.insert(stem, val);
                            }
                        }
                    }
                }
            }
            result.push(candidate);
        }
        result
    }
}
