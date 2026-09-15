impl Solution {
    pub fn power_update(nums: Vec<i32>, mut p: i32, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let mut values = nums.clone();
        values.extend(queries.iter().map(|query| query[0]));
        values.sort_unstable();
        values.dedup();
        let mut tree = vec![0_i32; values.len() + 1];
        fn add(tree: &mut [i32], mut index: usize) {
            index += 1;
            while index < tree.len() {
                tree[index] += 1;
                index += index & index.wrapping_neg();
            }
        }
        for value in &nums {
            add(&mut tree, values.binary_search(value).unwrap());
        }
        let mut answer = Vec::with_capacity(queries.len());
        let mut size = nums.len() as i32;
        for query in queries {
            add(&mut tree, values.binary_search(&query[0]).unwrap());
            size += 1;
            let mut rank = size - query[1] + 1;
            let mut index = 0_usize;
            let mut step = 1_usize << (usize::BITS - values.len().leading_zeros() - 1);
            while step > 0 {
                let next = index + step;
                if next < tree.len() && tree[next] < rank {
                    index = next;
                    rank -= tree[next];
                }
                step >>= 1;
            }
            p = mod_power_3930(p as i64, values[index]);
            answer.push(p);
        }
        answer
    }
}

fn mod_power_3930(mut base: i64, mut exponent: i32) -> i32 {
    const MODULUS: i64 = 1_000_000_007;
    let mut result = 1_i64;
    while exponent > 0 {
        if exponent & 1 != 0 {
            result = result * base % MODULUS;
        }
        base = base * base % MODULUS;
        exponent >>= 1;
    }
    result as i32
}
