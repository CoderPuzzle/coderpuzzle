use std::collections::HashMap;

impl Solution {
    pub fn most_common_course_pair(completions: Vec<Vec<String>>) -> Vec<String> {
        // Group rows per student; every student is judged and sorted
        // independently of the rest.
        let mut by_student: HashMap<String, Vec<(String, String, i32)>> = HashMap::new();
        for row in &completions {
            let rating: i32 = row[3].parse().unwrap();
            by_student
                .entry(row[0].clone())
                .or_default()
                .push((row[2].clone(), row[1].clone(), rating));
        }
        let mut counts: HashMap<(&str, &str), i32> = HashMap::new();
        for records in by_student.values() {
            // Qualification without floats: sum >= 4 * n is exactly
            // "average >= 4" over integer ratings.
            let n = records.len();
            if n < 5 {
                continue;
            }
            let total: i32 = records.iter().map(|record| record.2).sum();
            if total < 4 * n as i32 {
                continue;
            }
            // (date, course) sorts chronologically, name-breaking ties.
            let mut sorted: Vec<&(String, String, i32)> = records.iter().collect();
            sorted.sort();
            for pair in sorted.windows(2) {
                *counts.entry((&pair[0].1, &pair[1].1)).or_insert(0) += 1;
            }
        }
        // Sorted keys + strict > pin count-descending, then both names
        // ascending — no dependence on hash-map iteration order.
        let mut pairs: Vec<(&str, &str)> = counts.keys().copied().collect();
        pairs.sort_unstable();
        let mut best_pair: Option<(&str, &str)> = None;
        let mut best_count = -1;
        for pair in pairs {
            let count = counts[&pair];
            if count > best_count {
                best_count = count;
                best_pair = Some(pair);
            }
        }
        match best_pair {
            None => Vec::new(),
            Some((first, second)) => vec![first.to_string(), second.to_string(), best_count.to_string()],
        }
    }
}
