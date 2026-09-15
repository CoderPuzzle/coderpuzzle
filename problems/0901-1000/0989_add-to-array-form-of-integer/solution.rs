// `num` can hold 10⁴ digits, far past any fixed-width integer, so the
// addition runs schoolbook-style: right to left, one digit at a time, with
// `k` itself seeding the running carry.
impl Solution {
    pub fn add_to_array_form(num: Vec<i32>, k: i32) -> Vec<i32> {
        let mut carry = k;
        // at most max(num.len(), 5) + 1 result digits, so num.len() + 5
        // always suffices
        let mut result = Vec::with_capacity(num.len() + 5);
        for &digit in num.iter().rev() {
            carry += digit;
            result.push(carry % 10);
            carry /= 10;
        }
        // whatever of k outlives num keeps flowing out one digit at a time
        while carry > 0 {
            result.push(carry % 10);
            carry /= 10;
        }
        // digits were emitted least-significant first
        result.reverse();
        result
    }
}
