// XOR is its own inverse: canceling arr[i] out of
// encoded[i] = arr[i] ^ arr[i + 1] leaves
// arr[i + 1] = encoded[i] ^ arr[i]. Seed with first and unroll
// the chain left to right — the running element is the only
// unknown in the next equation.
impl Solution {
    pub fn decode(encoded: Vec<i32>, first: i32) -> Vec<i32> {
        let mut arr = Vec::with_capacity(encoded.len() + 1);
        arr.push(first);
        let mut current = first;
        for value in encoded {
            current ^= value;
            arr.push(current);
        }
        arr
    }
}
