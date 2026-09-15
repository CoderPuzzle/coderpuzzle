impl Solution {
    pub fn min_operations(s1: String, s2: String) -> i32 {
        let (s1, s2) = (s1.as_bytes(), s2.as_bytes());
        let mut selected_edges = 0;
        let mut covered_by_previous = false;
        let mut ones_difference = 0;

        for i in 0..s1.len() {
            ones_difference += (s2[i] == b'1') as i32 - (s1[i] == b'1') as i32;
            let needs_pair = s1[i] == b'1' && s2[i] == b'0';
            if needs_pair && !covered_by_previous {
                if s1.len() == 1 {
                    return -1;
                }
                selected_edges += 1;
                covered_by_previous = i + 1 < s1.len();
            } else {
                covered_by_previous = false;
            }
        }

        ones_difference + 3 * selected_edges
    }
}
