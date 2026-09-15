impl Solution {
    pub fn get_strongest(arr: Vec<i32>, k: i32) -> Vec<i32> {
        let k = k as usize;
        let mut sorted_arr = arr.clone();
        sorted_arr.sort();
        let m = sorted_arr[(arr.len() - 1) / 2];
        let mut arr = arr;
        arr.sort_by(|a, b| {
            let da = (*a as i64 - m as i64).abs();
            let db = (*b as i64 - m as i64).abs();
            db.cmp(&da).then(b.cmp(a))
        });
        arr.truncate(k);
        arr
    }
}
