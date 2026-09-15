use std::collections::BTreeMap;

impl Solution {
    pub fn average_height_of_buildings(buildings: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let mut events: BTreeMap<i32, (i64, i64)> = BTreeMap::new();
        for building in buildings {
            let start = events.entry(building[0]).or_insert((0, 0));
            start.0 += building[2] as i64;
            start.1 += 1;
            let end = events.entry(building[1]).or_insert((0, 0));
            end.0 -= building[2] as i64;
            end.1 -= 1;
        }

        let coordinates: Vec<(i32, (i64, i64))> = events.into_iter().collect();
        let mut street: Vec<Vec<i32>> = Vec::new();
        let mut height_sum = 0i64;
        let mut count = 0i64;
        for index in 0..coordinates.len() - 1 {
            let (left, event) = coordinates[index];
            height_sum += event.0;
            count += event.1;
            let right = coordinates[index + 1].0;
            if count == 0 {
                continue;
            }
            let average = (height_sum / count) as i32;
            if let Some(last) = street.last_mut() {
                if last[1] == left && last[2] == average {
                    last[1] = right;
                    continue;
                }
            }
            street.push(vec![left, right, average]);
        }
        street
    }
}
