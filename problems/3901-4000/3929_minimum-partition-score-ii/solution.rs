#[derive(Clone, Copy)]
struct PartitionLine3929 {
    slope: i64,
    intercept: i64,
    start: i64,
    count: i32,
}

impl Solution {
    pub fn min_partition_score(nums: Vec<i32>, k: i32) -> i64 {
        let mut total = 0_i64;
        let prefix: Vec<i64> = nums
            .into_iter()
            .map(|value| {
                total += value as i64;
                total
            })
            .collect();
        let run = |penalty: i64| -> (i64, i32) {
            let mut hull = vec![PartitionLine3929 {
                slope: 0,
                intercept: 0,
                start: i64::MIN,
                count: 0,
            }];
            let mut head = 0_usize;
            let mut cost = 0_i64;
            let mut count = 0_i32;
            for &x in &prefix {
                while head + 1 < hull.len() && hull[head + 1].start <= x {
                    head += 1;
                }
                let best = hull[head];
                cost = x * x + penalty + best.slope * x + best.intercept;
                count = best.count + 1;
                let mut line = PartitionLine3929 {
                    slope: -2 * x,
                    intercept: cost + x * x,
                    start: i64::MIN,
                    count,
                };
                while let Some(&old) = hull.last() {
                    let difference = line.intercept - old.intercept;
                    let denominator = old.slope - line.slope;
                    line.start = if count > old.count {
                        ceil_div_3929(difference, denominator)
                    } else {
                        floor_div_3929(difference, denominator) + 1
                    };
                    if line.start > old.start {
                        break;
                    }
                    hull.pop();
                    head = head.min(hull.len().saturating_sub(1));
                }
                if hull.is_empty() {
                    line.start = i64::MIN;
                    head = 0;
                }
                hull.push(line);
            }
            (cost, count)
        };
        let mut low = 0_i64;
        let mut high = total * total;
        while low < high {
            let middle = low + (high - low + 1) / 2;
            if run(middle).1 >= k {
                low = middle;
            } else {
                high = middle - 1;
            }
        }
        let relaxed = run(low).0;
        (relaxed - low * k as i64 + total) / 2
    }
}

fn floor_div_3929(value: i64, divisor: i64) -> i64 {
    let mut quotient = value / divisor;
    if value < 0 && value % divisor != 0 {
        quotient -= 1;
    }
    quotient
}

fn ceil_div_3929(value: i64, divisor: i64) -> i64 {
    let mut quotient = value / divisor;
    if value > 0 && value % divisor != 0 {
        quotient += 1;
    }
    quotient
}
