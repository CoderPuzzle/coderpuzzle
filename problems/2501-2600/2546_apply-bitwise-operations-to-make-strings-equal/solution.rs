impl Solution {
    pub fn make_strings_equal(s: String, target: String) -> bool {
        // The operation maps (0,0)->(0,0), (0,1)/(1,0)->(1,1), and
        // (1,1)->(1,0): an all-zero string is frozen forever, and once
        // a 1 exists it can never be the last one destroyed. "Contains
        // a 1" is therefore invariant in both directions, and any two
        // strings that agree on it are mutually reachable.
        s.contains('1') == target.contains('1')
    }
}
