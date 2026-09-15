impl Solution {
    pub fn watering_plants(plants: Vec<i32>, capacity: i32) -> i32 {
        let mut steps = plants.len() as i32;
        let mut remaining = capacity;
        for (index, need) in plants.into_iter().enumerate() {
            if remaining < need {
                steps += 2 * index as i32;
                remaining = capacity;
            }
            remaining -= need;
        }
        steps
    }
}
