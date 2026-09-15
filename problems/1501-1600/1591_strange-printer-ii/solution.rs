use std::collections::{HashMap, HashSet};

impl Solution {
    pub fn is_printable(targetGrid: Vec<Vec<i32>>) -> bool {
        let rows = targetGrid.len();
        let cols = targetGrid[0].len();

        // Each color's bounding rectangle: the smallest axis-aligned box
        // that covers every cell holding that color in the target grid.
        // Stored as (min_row, max_row, min_col, max_col).
        let mut bbox: HashMap<i32, (usize, usize, usize, usize)> = HashMap::new();
        for r in 0..rows {
            for c in 0..cols {
                let color = targetGrid[r][c];
                bbox.entry(color)
                    .and_modify(|b| {
                        b.0 = b.0.min(r);
                        b.1 = b.1.max(r);
                        b.2 = b.2.min(c);
                        b.3 = b.3.max(c);
                    })
                    .or_insert((r, r, c, c));
            }
        }

        // An edge color -> other means color's bounding box shows `other`
        // somewhere inside it, so color must be stamped before `other`.
        let mut adjacency: HashMap<i32, HashSet<i32>> = HashMap::new();
        for (&color, &(min_row, max_row, min_col, max_col)) in bbox.iter() {
            let neighbors = adjacency.entry(color).or_default();
            for r in min_row..=max_row {
                for c in min_col..=max_col {
                    let other = targetGrid[r][c];
                    if other != color {
                        neighbors.insert(other);
                    }
                }
            }
        }

        // A valid stamp order exists iff this dependency graph has no cycle.
        const WHITE: u8 = 0;
        const GRAY: u8 = 1;
        const BLACK: u8 = 2;
        let mut state: HashMap<i32, u8> = bbox.keys().map(|&color| (color, WHITE)).collect();

        fn has_cycle(node: i32, adjacency: &HashMap<i32, HashSet<i32>>, state: &mut HashMap<i32, u8>) -> bool {
            state.insert(node, GRAY);
            if let Some(neighbors) = adjacency.get(&node) {
                for &neighbor in neighbors {
                    match state[&neighbor] {
                        GRAY => return true,
                        WHITE => {
                            if has_cycle(neighbor, adjacency, state) {
                                return true;
                            }
                        }
                        _ => {}
                    }
                }
            }
            state.insert(node, BLACK);
            false
        }

        let colors: Vec<i32> = bbox.keys().copied().collect();
        for color in colors {
            if state[&color] == WHITE && has_cycle(color, &adjacency, &mut state) {
                return false;
            }
        }
        true
    }
}
