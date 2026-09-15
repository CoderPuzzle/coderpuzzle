impl Solution {
    pub fn count_matches(items: Vec<Vec<String>>, rule_key: String, rule_value: String) -> i32 {
        // The three rule keys are exactly the three columns of every item,
        // so the key resolves once to a column index and the loop below
        // compares one fixed field of each row.
        let index = column_index(&rule_key);
        let mut matches = 0;
        for item in &items {
            if item[index] == rule_value {
                matches += 1;
            }
        }
        matches
    }
}

// "type" is column 0, "color" column 1, "name" column 2.
fn column_index(rule_key: &str) -> usize {
    match rule_key {
        "type" => 0,
        "color" => 1,
        _ => 2,
    }
}
