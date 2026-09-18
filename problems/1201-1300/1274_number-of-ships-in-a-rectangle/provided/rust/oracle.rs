// Problem-provided oracle (Sea), Rust side. Assembled into every
// submission's crate by the judge; never editable in the editor.
// Constructed from the case state: the hidden ship points as generic
// values, then the query budget.
#[allow(dead_code)]
pub struct Sea {
    ships: Vec<[i32; 2]>,
    budget: i64,
}

impl Sea {
    pub fn new(construction: &[OjValue], budget: i64) -> Self {
        let points = match construction.first() {
            Some(OjValue::Array(points)) => points.clone(),
            _ => panic!("Sea ship data must be an array"),
        };
        let mut ships = Vec::with_capacity(points.len());
        for point in points {
            let pair = match &point {
                OjValue::Array(pair) if pair.len() == 2 => pair,
                _ => panic!("Sea ship data must hold point pairs"),
            };
            let x = match pair[0] {
                OjValue::Int(v) => v as i32,
                _ => panic!("Sea ship points must be integers"),
            };
            let y = match pair[1] {
                OjValue::Int(v) => v as i32,
                _ => panic!("Sea ship points must be integers"),
            };
            ships.push([x, y]);
        }
        Sea { ships, budget }
    }

    pub fn has_ships(&mut self, top_right: &[i32], bottom_left: &[i32]) -> bool {
        if self.budget <= 0 {
            panic!("Sea query budget exhausted");
        }
        self.budget -= 1;
        self.ships.iter().any(|ship| {
            ship[0] >= bottom_left[0] && ship[0] <= top_right[0] && ship[1] >= bottom_left[1] && ship[1] <= top_right[1]
        })
    }
}
