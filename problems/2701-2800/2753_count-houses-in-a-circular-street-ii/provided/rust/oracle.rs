// Problem-provided oracle (Street), Rust side. Assembled into
// every submission's crate by the judge; never editable in the editor.
// Constructed from the case state: the door states as a generic value
// plus the query budget; the agent starts at the first house.
#[allow(dead_code)]
pub struct Street {
    doors: Vec<i32>,
    budget: i64,
    position: usize,
}

impl Street {
    pub fn new(construction: &[OjValue], budget: i64) -> Self {
        let items = match construction.first() {
            Some(OjValue::Array(items)) => items.clone(),
            _ => panic!("Street doors must be an array"),
        };
        let mut doors = Vec::with_capacity(items.len());
        for item in items {
            match item {
                OjValue::Int(v) => doors.push(v as i32),
                _ => panic!("Street doors must be integers"),
            }
        }
        Street {
            doors,
            budget,
            position: 0,
        }
    }

    fn spend(&mut self) {
        if self.budget <= 0 {
            panic!("Street query budget exhausted");
        }
        self.budget -= 1;
    }

    pub fn close_door(&mut self) {
        self.spend();
        self.doors[self.position] = 0;
    }

    pub fn is_door_open(&mut self) -> bool {
        self.spend();
        self.doors[self.position] == 1
    }

    pub fn move_right(&mut self) {
        self.spend();
        self.position = (self.position + 1) % self.doors.len();
    }
}
