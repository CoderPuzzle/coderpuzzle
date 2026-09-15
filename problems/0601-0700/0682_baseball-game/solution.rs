impl Solution {
    pub fn cal_points(operations: Vec<String>) -> i32 {
        // Every operation only ever touches the end of the record: a literal
        // pushes, the double and the sum read the last entry (or the last
        // two) and push, the cancel pops. Replaying the operations left to
        // right on a stack is therefore the whole computation, and the answer
        // is the sum of what is left — 0 when the record ends empty.
        let mut record: Vec<i32> = Vec::new();
        for op in &operations {
            match op.as_str() {
                "+" => record.push(record[record.len() - 1] + record[record.len() - 2]),
                "D" => record.push(2 * record[record.len() - 1]),
                "C" => {
                    record.pop();
                }
                _ => record.push(op.parse::<i32>().unwrap()),
            }
        }
        record.iter().sum()
    }
}
