impl Solution {
    pub fn meet_requirement(n: i32, lights: Vec<Vec<i32>>, requirement: Vec<i32>) -> i32 {
        let n = n as usize;
        let mut delta = vec![0i64; n + 1];
        for light in &lights {
            let position = light[0] as i64;
            let range = light[1] as i64;
            delta[(position - range).max(0) as usize] += 1;
            delta[((position + range + 1).min(n as i64)) as usize] -= 1;
        }
        let mut brightness = 0i64;
        let mut count = 0i32;
        for i in 0..n {
            brightness += delta[i];
            if brightness >= requirement[i] as i64 {
                count += 1;
            }
        }
        count
    }
}
