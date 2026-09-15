impl Solution {
    // A defective readout agrees with the truth up to the dropped point
    // and then matches the truth shifted one place left, so each candidacy
    // is a single scan; when both scans succeed (or both fail), the defect
    // cannot be pinned on either sensor.
    pub fn bad_sensor(sensor1: Vec<i32>, sensor2: Vec<i32>) -> i32 {
        let one = shifted(&sensor1, &sensor2);
        let two = shifted(&sensor2, &sensor1);
        if one == two {
            return -1;
        }
        if one {
            1
        } else {
            2
        }
    }
}

fn shifted(a: &[i32], b: &[i32]) -> bool {
    let mut i = 0;
    while i < a.len() && a[i] == b[i] {
        i += 1;
    }
    while i + 1 < a.len() {
        if a[i] != b[i + 1] {
            return false;
        }
        i += 1;
    }
    true
}
