use std::collections::HashMap;
use std::collections::HashSet;

impl Solution {
    pub fn grid_illumination(n: i32, lamps: Vec<Vec<i32>>, queries: Vec<Vec<i32>>) -> Vec<bool> {
        let mut row: HashMap<i32, i32> = HashMap::new();
        let mut col: HashMap<i32, i32> = HashMap::new();
        let mut diag: HashMap<i32, i32> = HashMap::new();
        let mut anti_diag: HashMap<i32, i32> = HashMap::new();
        let mut on: HashSet<(i32, i32)> = HashSet::new();

        for lamp in &lamps {
            let (x, y) = (lamp[0], lamp[1]);
            if !on.insert((x, y)) {
                continue;
            }
            *row.entry(x).or_insert(0) += 1;
            *col.entry(y).or_insert(0) += 1;
            *diag.entry(x - y).or_insert(0) += 1;
            *anti_diag.entry(x + y).or_insert(0) += 1;
        }

        let mut ans = Vec::with_capacity(queries.len());
        for query in &queries {
            let (x, y) = (query[0], query[1]);
            let illuminated = *row.get(&x).unwrap_or(&0) > 0
                || *col.get(&y).unwrap_or(&0) > 0
                || *diag.get(&(x - y)).unwrap_or(&0) > 0
                || *anti_diag.get(&(x + y)).unwrap_or(&0) > 0;
            ans.push(illuminated);

            for dx in -1..=1 {
                for dy in -1..=1 {
                    let (px, py) = (x + dx, y + dy);
                    if on.remove(&(px, py)) {
                        *row.entry(px).or_insert(0) -= 1;
                        *col.entry(py).or_insert(0) -= 1;
                        *diag.entry(px - py).or_insert(0) -= 1;
                        *anti_diag.entry(px + py).or_insert(0) -= 1;
                    }
                }
            }
        }

        ans
    }
}
