impl Solution {
    pub fn assign_bikes(workers: Vec<Vec<i32>>, bikes: Vec<Vec<i32>>) -> Vec<i32> {
        // Build one (distance, worker index, bike index) triple per pair and
        // sort ascending by distance, then worker index, then bike index —
        // exactly the tie-break the statement specifies. Walking the sorted
        // triples and assigning the first time both sides are still free
        // reproduces the statement's own greedy process.
        let n = workers.len();
        let m = bikes.len();
        let mut triples: Vec<(i32, usize, usize)> = Vec::with_capacity(n * m);
        for i in 0..n {
            for j in 0..m {
                let distance = (workers[i][0] - bikes[j][0]).abs() + (workers[i][1] - bikes[j][1]).abs();
                triples.push((distance, i, j));
            }
        }
        triples.sort();

        let mut result = vec![-1i32; n];
        let mut used_bike = vec![false; m];
        let mut assigned = 0;
        for (_distance, i, j) in triples {
            if result[i] != -1 || used_bike[j] {
                continue;
            }
            result[i] = j as i32;
            used_bike[j] = true;
            assigned += 1;
            if assigned == n {
                break;
            }
        }
        result
    }
}
