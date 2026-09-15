pub struct ParkingSystem {
    slots: [i32; 4],
}

impl ParkingSystem {
    pub fn new(big: i32, medium: i32, small: i32) -> Self {
        ParkingSystem {
            slots: [0, big, medium, small],
        }
    }

    pub fn addCar(&mut self, carType: i32) -> bool {
        let idx = carType as usize;
        if self.slots[idx] > 0 {
            self.slots[idx] -= 1;
            true
        } else {
            false
        }
    }
}
