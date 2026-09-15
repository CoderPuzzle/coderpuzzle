impl Solution {
    pub fn create_sorted_array(instructions: Vec<i32>) -> i32 {
        const MOD: i64 = 1_000_000_007;
        if instructions.is_empty() {
            return 0;
        }
        let m = *instructions.iter().max().unwrap() as usize;
        // Fenwick tree indexed by value: prefix counts with point updates.
        let mut tree = vec![0i64; m + 1];

        // Climb the lowbit ladder to add one occurrence of value i.
        let mut update = |tree: &mut Vec<i64>, mut i: usize| {
            while i <= m {
                tree[i] += 1;
                i += i & i.wrapping_neg();
            }
        };

        // Sum of occurrences of values 1..i.
        let query = |tree: &Vec<i64>, mut i: usize| -> i64 {
            let mut s: i64 = 0;
            while i > 0 {
                s += tree[i];
                i -= i & i.wrapping_neg();
            }
            s
        };

        let mut total: i64 = 0;
        let mut count: i64 = 0;
        for &x in &instructions {
            let x = x as usize;
            // Inserting x costs the smaller of: elements strictly below x
            // (query(x-1)) and strictly above (count - query(x), since
            // query(x) includes equals — equals land in neither bucket).
            let less = query(&tree, x - 1);
            let greater = count - query(&tree, x);
            total = (total + less.min(greater)) % MOD;
            update(&mut tree, x);
            count += 1;
        }
        total as i32
    }
}
