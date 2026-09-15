impl Solution {
    pub fn remove_substring(s: String, k: i32) -> String {
        let k = k as usize;
        // Run-length stack: each entry is one maximal run, byte plus count.
        let mut stack: Vec<(u8, usize)> = Vec::with_capacity(s.len());
        for &b in s.as_bytes() {
            match stack.last_mut() {
                Some(last) if last.0 == b => last.1 += 1,
                _ => stack.push((b, 1)),
            }
            // A ')' run sitting on a '(' run is a live junction: cancel
            // min(open / k, close / k) whole blocks of k from both sides.
            while stack.len() > 1 && stack[stack.len() - 1].0 == b')' && stack[stack.len() - 2].0 == b'(' {
                let blocks = (stack[stack.len() - 2].1 / k).min(stack[stack.len() - 1].1 / k);
                if blocks == 0 {
                    break;
                }
                let mut close = stack.pop().unwrap();
                let mut below = stack.pop().unwrap();
                below.1 -= blocks * k;
                close.1 -= blocks * k;
                // Survivors go back on top, merging equal-char neighbours; a
                // merge can expose another junction one level down.
                for run in [below, close] {
                    if run.1 > 0 {
                        match stack.last_mut() {
                            Some(last) if last.0 == run.0 => last.1 += run.1,
                            _ => stack.push(run),
                        }
                    }
                }
            }
        }
        // The surviving runs are the irreducible string.
        let mut result = String::with_capacity(s.len());
        for (ch, count) in &stack {
            for _ in 0..*count {
                result.push(*ch as char);
            }
        }
        result
    }
}
