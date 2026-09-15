impl Solution {
    pub fn min_swaps_couples(row: Vec<i32>) -> i32 {
        let mut arr: Vec<i32> = row.clone();
        let n = arr.len();
        let mut pos: Vec<usize> = vec![0; n];
        for (i, &person) in arr.iter().enumerate() {
            pos[person as usize] = i;
        }

        let mut swaps: i32 = 0;
        let mut i = 0usize;
        while i < n {
            let first = arr[i];
            let partner = first ^ 1; // couples are (0,1), (2,3), ...
            if arr[i + 1] == partner {
                i += 2;
                continue;
            }
            let j = pos[partner as usize];
            let other = arr[i + 1];
            arr[i + 1] = partner;
            arr[j] = other;
            pos[partner as usize] = i + 1;
            pos[other as usize] = j;
            swaps += 1;
            i += 2;
        }
        swaps
    }
}
