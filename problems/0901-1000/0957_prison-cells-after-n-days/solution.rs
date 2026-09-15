use std::collections::HashMap;

// Eight two-state cells admit at most 256 rows, and day one vacates both
// end cells, leaving 64 — the deterministic daily map must loop. Hash each
// row (as its 8-bit mask) to its first day; when the row reappears on day
// `day` after first being seen on day `first`, the future repeats that
// day - first cycle, so only (n - day) % cycle further transitions remain.
impl Solution {
    pub fn prison_after_n_days(cells: Vec<i32>, n: i32) -> Vec<i32> {
        let mut cells = cells;
        let mut seen: HashMap<u8, i32> = HashMap::new();
        let mut state = mask(&cells);
        let mut day = 0;
        while day < n && !seen.contains_key(&state) {
            seen.insert(state, day);
            cells = next_day(&cells);
            state = mask(&cells);
            day += 1;
        }
        if day < n {
            let cycle = day - seen[&state];
            for _ in 0..(n - day) % cycle {
                cells = next_day(&cells);
            }
        }
        cells
    }
}

fn next_day(cells: &[i32]) -> Vec<i32> {
    let mut next = vec![0; 8];
    for i in 1..7 {
        next[i] = if cells[i - 1] == cells[i + 1] { 1 } else { 0 };
    }
    next
}

fn mask(cells: &[i32]) -> u8 {
    cells.iter().fold(0u8, |bits, &value| bits << 1 | value as u8)
}
