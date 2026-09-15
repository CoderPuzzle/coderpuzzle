use std::collections::BTreeMap;

impl Solution {
    pub fn brightest_position(lights: Vec<Vec<i32>>) -> i32 {
        let mut events: BTreeMap<i32, i32> = BTreeMap::new();
        for light in lights {
            *events.entry(light[0] - light[1]).or_insert(0) += 1;
            *events.entry(light[0] + light[1] + 1).or_insert(0) -= 1;
        }

        let mut brightness = 0;
        let mut best_brightness = 0;
        let mut answer = 0;
        for (coordinate, delta) in events {
            brightness += delta;
            if brightness > best_brightness {
                best_brightness = brightness;
                answer = coordinate;
            }
        }
        answer
    }
}
