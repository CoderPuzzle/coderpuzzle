// A student who does not want the top sandwich just cycles to the back,
// leaving the queue in the same state — so only the two preference
// counts matter. Spend them down the stack and stop at the first
// unwanted sandwich.
impl Solution {
    pub fn count_students(students: Vec<i32>, sandwiches: Vec<i32>) -> i32 {
        let mut count = [0i32; 2];
        for &preference in &students {
            count[preference as usize] += 1;
        }
        for &sandwich in &sandwiches {
            // nobody left prefers this type, and nothing below the top of
            // the stack is reachable — everyone remaining goes hungry
            if count[sandwich as usize] == 0 {
                break;
            }
            count[sandwich as usize] -= 1;
        }
        count[0] + count[1]
    }
}
