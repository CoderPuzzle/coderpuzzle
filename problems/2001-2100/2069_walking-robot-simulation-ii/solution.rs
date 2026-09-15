pub struct Robot {
    width: i32,
    height: i32,
    perimeter: i32,
    index: i32,
    moved: bool,
}

impl Robot {
    pub fn new(width: i32, height: i32) -> Self {
        Self {
            width,
            height,
            perimeter: 2 * (width + height) - 4,
            index: 0,
            moved: false,
        }
    }

    pub fn step(&mut self, num: i32) {
        self.index = (self.index + num) % self.perimeter;
        self.moved = true;
    }

    pub fn getPos(&mut self) -> Vec<i32> {
        if self.index <= self.width - 1 {
            return vec![self.index, 0];
        }
        let right_end = self.width + self.height - 2;
        if self.index <= right_end {
            return vec![self.width - 1, self.index - (self.width - 1)];
        }
        let top_end = 2 * self.width + self.height - 3;
        if self.index <= top_end {
            return vec![top_end - self.index, self.height - 1];
        }
        vec![0, self.perimeter - self.index]
    }

    pub fn getDir(&mut self) -> String {
        if !self.moved {
            return "East".to_string();
        }
        if self.index == 0 {
            return "South".to_string();
        }
        if self.index <= self.width - 1 {
            return "East".to_string();
        }
        if self.index <= self.width + self.height - 2 {
            return "North".to_string();
        }
        if self.index <= 2 * self.width + self.height - 3 {
            return "West".to_string();
        }
        "South".to_string()
    }
}
