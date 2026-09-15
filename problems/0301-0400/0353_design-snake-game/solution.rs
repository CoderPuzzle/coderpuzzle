use std::collections::{HashSet, VecDeque};

// The body as a deque (head at the front, tail at the back) plus a set
// of the covered cells: move pushes the new head on and — unless food is
// eaten — pops the tail in the same step, so the snake slides forward
// exactly one cell and the set answers the body-collision question in
// O(1).
pub struct SnakeGame {
    width: i32,
    height: i32,
    food: Vec<(i32, i32)>,
    next_food: usize,
    score: i32,
    body: VecDeque<(i32, i32)>,
    occupied: HashSet<(i32, i32)>,
}

impl SnakeGame {
    pub fn new(width: i32, height: i32, food: Vec<Vec<i32>>) -> Self {
        SnakeGame {
            width,
            height,
            food: food.iter().map(|piece| (piece[0], piece[1])).collect(),
            next_food: 0,
            score: 0,
            body: VecDeque::from([(0, 0)]),
            occupied: HashSet::from([(0, 0)]),
        }
    }

    pub fn move_snake(&mut self, direction: String) -> i32 {
        let (row_step, col_step) = match direction.as_str() {
            "U" => (-1, 0),
            "D" => (1, 0),
            "L" => (0, -1),
            _ => (0, 1),
        };
        let (head_row, head_col) = *self.body.front().unwrap();
        let new_head = (head_row + row_step, head_col + col_step);
        if new_head.0 < 0 || new_head.0 >= self.height || new_head.1 < 0 || new_head.1 >= self.width {
            return -1;
        }
        let eating = self.next_food < self.food.len() && self.food[self.next_food] == new_head;
        if !eating {
            // The tail vacates its cell in this very step, so a head
            // landing on the CURRENT tail position is legal.
            self.occupied.remove(&self.body.pop_back().unwrap());
        }
        if self.occupied.contains(&new_head) {
            return -1;
        }
        self.body.push_front(new_head);
        self.occupied.insert(new_head);
        if eating {
            self.next_food += 1;
            self.score += 1;
        }
        self.score
    }
}
