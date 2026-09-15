impl Solution {
    pub fn maximum_sum_queries(nums1: Vec<i32>, nums2: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i64> {
        let n = nums1.len();
        let mut points: Vec<(i64, i64)> = nums1
            .iter()
            .zip(nums2.iter())
            .map(|(&x, &y)| (x as i64, y as i64))
            .collect();
        points.sort_by(|a, b| b.0.cmp(&a.0));
        let mut order: Vec<usize> = (0..queries.len()).collect();
        order.sort_by(|&a, &b| queries[b][0].cmp(&queries[a][0]));

        let mut keys: Vec<i64> = Vec::with_capacity(n);
        let mut bests: Vec<i64> = Vec::with_capacity(n);

        fn insert(keys: &mut Vec<i64>, bests: &mut Vec<i64>, y: i64, total: i64) {
            let mut pos = keys.partition_point(|&k| k < y);
            if pos < keys.len() && keys[pos] == y {
                if bests[pos] >= total {
                    return;
                }
                keys.remove(pos);
                bests.remove(pos);
            }
            if pos < keys.len() && bests[pos] >= total {
                return;
            }
            while pos > 0 && bests[pos - 1] <= total {
                keys.remove(pos - 1);
                bests.remove(pos - 1);
                pos -= 1;
            }
            keys.insert(pos, y);
            bests.insert(pos, total);
        }

        let mut answer: Vec<i64> = vec![-1; queries.len()];
        let mut point_index = 0usize;
        for &qi in &order {
            let bound_x = queries[qi][0] as i64;
            let bound_y = queries[qi][1] as i64;
            while point_index < n && points[point_index].0 >= bound_x {
                let (x, y) = points[point_index];
                insert(&mut keys, &mut bests, y, x + y);
                point_index += 1;
            }
            let pos = keys.partition_point(|&k| k < bound_y);
            if pos < keys.len() {
                answer[qi] = bests[pos];
            }
        }
        answer
    }
}
