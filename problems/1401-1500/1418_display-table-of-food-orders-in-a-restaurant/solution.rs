use std::collections::{BTreeMap, BTreeSet};

impl Solution {
    pub fn display_table(orders: Vec<Vec<String>>) -> Vec<Vec<String>> {
        let mut counts: BTreeMap<i64, BTreeMap<String, i64>> = BTreeMap::new();
        let mut foods: BTreeSet<String> = BTreeSet::new();
        for order in &orders {
            let table: i64 = order[1].parse().unwrap();
            let food = order[2].clone();
            foods.insert(food.clone());
            *counts.entry(table).or_default().entry(food).or_insert(0) += 1;
        }
        let sorted_foods: Vec<String> = foods.into_iter().collect();
        let mut grid: Vec<Vec<String>> = Vec::with_capacity(counts.len() + 1);
        let mut header = vec![String::from("Table")];
        header.extend(sorted_foods.iter().cloned());
        grid.push(header);
        for (table, row) in &counts {
            let mut out = Vec::with_capacity(sorted_foods.len() + 1);
            out.push(table.to_string());
            for food in &sorted_foods {
                out.push(row.get(food).copied().unwrap_or(0).to_string());
            }
            grid.push(out);
        }
        grid
    }
}
