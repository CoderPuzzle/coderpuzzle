impl Solution {
    pub fn interval_intersection(first_list: Vec<Vec<i32>>, second_list: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let mut result: Vec<Vec<i32>> = Vec::new();
        let mut i = 0usize;
        let mut j = 0usize;
        while i < first_list.len() && j < second_list.len() {
            // The overlap of the two current intervals is [max starts,
            // min ends]; lo <= hi means they intersect (closed intervals,
            // so touching endpoints still count).
            let lo = first_list[i][0].max(second_list[j][0]);
            let hi = first_list[i][1].min(second_list[j][1]);
            if lo <= hi {
                result.push(vec![lo, hi]);
            }
            // Retire the interval that ends earlier: later intervals in the
            // other list start strictly after its end, so it is done forever.
            if first_list[i][1] < second_list[j][1] {
                i += 1;
            } else {
                j += 1;
            }
        }
        result
    }
}
