// Problem-provided oracle (GridMaster), Rust side. Assembled into
// every submission's crate by the judge; never editable in the editor.
// Constructed from the case state: the grid, the start cell and the
// goal cell as generic values, then the query budget.
#[allow(dead_code)]
pub struct GridMaster {
    cost: Vec<Vec<i32>>,
    row: i32,
    col: i32,
    goal_row: i32,
    goal_col: i32,
    budget: i64,
}

impl GridMaster {
    pub fn new(construction: &[OjValue], budget: i64) -> Self {
        let grid = match construction.first() {
            Some(OjValue::Array(rows)) => rows.clone(),
            _ => panic!("GridMaster grid must be an array"),
        };
        let mut cost = Vec::with_capacity(grid.len());
        for row in grid {
            let cells = match row {
                OjValue::Array(cells) => cells,
                _ => panic!("GridMaster grid rows must be arrays"),
            };
            cost.push(
                cells
                    .into_iter()
                    .map(|cell| match cell {
                        OjValue::Int(v) => v as i32,
                        _ => panic!("GridMaster grid cells must be integers"),
                    })
                    .collect::<Vec<i32>>(),
            );
        }
        let cell_of = |value: &OjValue| -> (i32, i32) {
            match value {
                OjValue::Array(items) if items.len() >= 2 => match (&items[0], &items[1]) {
                    (OjValue::Int(r), OjValue::Int(c)) => (*r as i32, *c as i32),
                    _ => panic!("GridMaster coordinates must be integers"),
                },
                _ => panic!("GridMaster start and goal must be [row, col]"),
            }
        };
        let (row, col) = cell_of(&construction[1]);
        let (goal_row, goal_col) = cell_of(&construction[2]);
        GridMaster {
            cost,
            row,
            col,
            goal_row,
            goal_col,
            budget,
        }
    }

    fn spend(&mut self) {
        if self.budget <= 0 {
            panic!("GridMaster query budget exhausted");
        }
        self.budget -= 1;
    }

    fn delta(direction: &str) -> (i32, i32) {
        match direction {
            "U" => (-1, 0),
            "D" => (1, 0),
            "L" => (0, -1),
            "R" => (0, 1),
            _ => panic!("Direction must be one of U, D, L, R"),
        }
    }

    fn enterable(&self, r: i32, c: i32) -> bool {
        r >= 0
            && c >= 0
            && (r as usize) < self.cost.len()
            && (c as usize) < self.cost[r as usize].len()
            && self.cost[r as usize][c as usize] > 0
    }

    pub fn can_move(&mut self, direction: &str) -> bool {
        self.spend();
        let (dr, dc) = Self::delta(direction);
        self.enterable(self.row + dr, self.col + dc)
    }

    /// `move` is a Rust keyword, so the walking method is `step`.
    pub fn step(&mut self, direction: &str) -> i32 {
        self.spend();
        let (dr, dc) = Self::delta(direction);
        let (r, c) = (self.row + dr, self.col + dc);
        if !self.enterable(r, c) {
            return -1;
        }
        self.row = r;
        self.col = c;
        self.cost[r as usize][c as usize]
    }

    pub fn is_target(&mut self) -> bool {
        self.spend();
        self.row == self.goal_row && self.col == self.goal_col
    }
}
