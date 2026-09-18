// Problem-provided oracle (Robot), Rust side. Assembled into every
// submission's crate by the judge; never editable in the editor.
// Constructed from the case state: the room grid and the start cell as
// generic values, then the operation budget.
#[allow(dead_code)]
pub struct Robot {
    room: Vec<Vec<i32>>,
    row: i32,
    col: i32,
    face: usize, // 0 = up
    cleaned: std::collections::BTreeSet<(i32, i32)>,
    budget: i64,
}

const SWEEPER_DIRECTIONS: [(i32, i32); 4] = [(-1, 0), (0, 1), (1, 0), (0, -1)]; // up, right, down, left

impl Robot {
    pub fn new(construction: &[OjValue], budget: i64) -> Self {
        let room_data = match construction.first() {
            Some(OjValue::Array(rows)) => rows.clone(),
            _ => panic!("Robot room must be an array"),
        };
        let mut room = Vec::with_capacity(room_data.len());
        for row in &room_data {
            let cells = match row {
                OjValue::Array(cells) => cells,
                _ => panic!("Robot room rows must be arrays"),
            };
            let mut values = Vec::with_capacity(cells.len());
            for cell in cells {
                match cell {
                    OjValue::Int(v) => values.push(*v as i32),
                    _ => panic!("Robot room cells must be integers"),
                }
            }
            room.push(values);
        }
        let start = match construction.get(1) {
            Some(OjValue::Array(pair)) if pair.len() == 2 => pair,
            _ => panic!("Robot start must be a pair of integers"),
        };
        let (row, col) = match (&start[0], &start[1]) {
            (OjValue::Int(r), OjValue::Int(c)) => (*r as i32, *c as i32),
            _ => panic!("Robot start must be a pair of integers"),
        };
        let mut sweeper = Robot {
            room,
            row,
            col,
            face: 0, // starts facing up
            cleaned: std::collections::BTreeSet::new(),
            budget,
        };
        sweeper.clean();
        sweeper
    }

    fn spend(&mut self) {
        if self.budget <= 0 {
            panic!("Robot operation budget exhausted");
        }
        self.budget -= 1;
    }

    pub fn r#move(&mut self) -> bool {
        self.spend();
        let (dr, dc) = SWEEPER_DIRECTIONS[self.face];
        let nr = self.row + dr;
        let nc = self.col + dc;
        if nr < 0
            || nc < 0
            || (nr as usize) >= self.room.len()
            || (nc as usize) >= self.room[nr as usize].len()
            || self.room[nr as usize][nc as usize] == 0
        {
            return false; // wall or blocked cell: stays in place
        }
        self.row = nr;
        self.col = nc;
        true
    }

    pub fn turn_left(&mut self) {
        self.spend();
        self.face = (self.face + 3) % 4;
    }

    pub fn turn_right(&mut self) {
        self.spend();
        self.face = (self.face + 1) % 4;
    }

    pub fn clean(&mut self) {
        self.spend();
        self.cleaned.insert((self.row, self.col));
    }

    pub fn verdict(&self) -> OjValue {
        OjValue::Array(
            self.cleaned
                .iter()
                .map(|(row, col)| OjValue::Array(vec![OjValue::Int(*row as i64), OjValue::Int(*col as i64)]))
                .collect(),
        )
    }
}
