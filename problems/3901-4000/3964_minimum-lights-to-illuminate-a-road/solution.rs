impl Solution {
    pub fn min_lights(lights: Vec<i32>) -> i32 {
        let n = lights.len();
        let mut diff = vec![0; n + 1];
        for (i, &radius) in lights.iter().enumerate() {
            if radius == 0 {
                continue;
            }
            let left = (i as i32 - radius).max(0) as usize;
            let right = (i as i32 + radius).min(n as i32 - 1) as usize;
            diff[left] += 1;
            diff[right + 1] -= 1;
        }
        let mut covered = vec![false; n];
        let mut current = 0;
        for i in 0..n {
            current += diff[i];
            covered[i] = current > 0;
        }

        let mut answer = 0;
        let mut i = 0;
        while i < n {
            if !covered[i] {
                answer += 1;
                let end = (i + 2).min(n - 1);
                for j in i..=end {
                    covered[j] = true;
                }
                i = end + 1;
            } else {
                i += 1;
            }
        }
        answer
    }
}
