impl Solution {
    pub fn min_generations(points: Vec<Vec<i32>>, target: Vec<i32>) -> i32 {
        let size = 7usize;
        let total = size * size * size;
        let inf = 1_000_000_000i32;
        let mut best = vec![inf; total];
        let index = |x: usize, y: usize, z: usize| x * size * size + y * size + z;
        for point in points {
            best[index(point[0] as usize, point[1] as usize, point[2] as usize)] = 0;
        }

        let mut changed = true;
        while changed {
            changed = false;
            for a in 0..total {
                if best[a] == inf {
                    continue;
                }
                let ax = a / (size * size);
                let ay = (a / size) % size;
                let az = a % size;
                for b in (a + 1)..total {
                    if best[b] == inf {
                        continue;
                    }
                    let bx = b / (size * size);
                    let by = (b / size) % size;
                    let bz = b % size;
                    let nx = (ax + bx) / 2;
                    let ny = (ay + by) / 2;
                    let nz = (az + bz) / 2;
                    let next = index(nx, ny, nz);
                    let candidate = best[a].max(best[b]) + 1;
                    if candidate < best[next] {
                        best[next] = candidate;
                        changed = true;
                    }
                }
            }
        }

        let answer = best[index(target[0] as usize, target[1] as usize, target[2] as usize)];
        if answer == inf {
            -1
        } else {
            answer
        }
    }
}
