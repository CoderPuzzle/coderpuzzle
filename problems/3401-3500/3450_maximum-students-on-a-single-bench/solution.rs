impl Solution {
    // Mark (bench, student) pairs in a fixed grid; the first sight of a
    // pair is the only one that bumps its bench's unique count.
    pub fn max_students_on_bench(students: Vec<Vec<i32>>) -> i32 {
        let mut seen = [[false; 101]; 101];
        let mut count = [0i32; 101];
        for entry in &students {
            let (student, bench) = (entry[0] as usize, entry[1] as usize);
            if !seen[bench][student] {
                seen[bench][student] = true;
                count[bench] += 1;
            }
        }
        *count.iter().max().unwrap()
    }
}
