impl Solution {
    pub fn exclusive_time(n: i32, logs: Vec<String>) -> Vec<i32> {
        let n = n as usize;
        let mut res = vec![0i64; n];
        let mut stack_fid: Vec<usize> = Vec::new();
        let mut stack_resume: Vec<i64> = Vec::new();
        for log in &logs {
            let b = log.as_bytes();
            let c1 = b.iter().position(|&c| c == b':').unwrap();
            let c2 = b[c1 + 1..].iter().position(|&c| c == b':').unwrap() + c1 + 1;
            let fid: usize = log[..c1].parse().unwrap();
            let start = b[c1 + 1] == b's';
            let ts: i64 = log[c2 + 1..].parse().unwrap();
            if start {
                if let Some(&top) = stack_fid.last() {
                    let resume = *stack_resume.last().unwrap();
                    res[top] += ts - resume;
                }
                stack_fid.push(fid);
                stack_resume.push(ts);
            } else {
                let top = stack_fid.pop().unwrap();
                let start_ts = stack_resume.pop().unwrap();
                res[top] += ts - start_ts + 1;
                if let Some(last) = stack_resume.last_mut() {
                    *last = ts + 1;
                }
            }
        }
        res.into_iter().map(|v| v as i32).collect()
    }
}
