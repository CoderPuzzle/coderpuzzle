impl Solution {
    pub fn xor_queries(arr: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let n = arr.len();
        // prefix[t] = XOR of the first t elements (prefix[0] = 0).
        let mut prefix = vec![0i32; n + 1];
        for i in 0..n {
            prefix[i + 1] = prefix[i] ^ arr[i];
        }
        // Self-inverse XOR telescopes: elements before l appear in both
        // operands and annihilate, leaving exactly arr[l..r] — O(1) per query.
        queries
            .iter()
            .map(|q| prefix[q[1] as usize + 1] ^ prefix[q[0] as usize])
            .collect()
    }
}
