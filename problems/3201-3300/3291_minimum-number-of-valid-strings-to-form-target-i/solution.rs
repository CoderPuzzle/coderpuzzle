impl Solution {
    pub fn min_valid_strings(words: Vec<String>, target: String) -> i32 {
        // reach[i] is the largest L with target[i:i+L] a prefix of some word:
        // for each word, one Z-function over word + separator + target yields,
        // at every target offset, how many characters continue to match the
        // word's own prefix. With reach fixed, the pieces form a jump game:
        // standing at position i jumps right by any length in [1, reach[i]],
        // and the fewest jumps to cover n characters is the classic layered
        // greedy scan — every position folds its reach into the frontier
        // before the boundary trigger fires.
        let bytes: Vec<i32> = target.bytes().map(|b| b as i32).collect();
        let n = bytes.len();
        let mut reach = vec![0usize; n];
        for w in words.iter() {
            let mut values = Vec::with_capacity(w.len() + 1 + n);
            values.extend(w.bytes().map(|b| b as i32));
            values.push(-1);
            values.extend(bytes.iter().copied());
            let z = z_function(&values);
            let base = w.len() + 1;
            for i in 0..n {
                if z[base + i] > reach[i] {
                    reach[i] = z[base + i];
                }
            }
        }
        let mut steps = 0i32;
        let mut cur_end = 0usize; // with `steps` pieces, target[:cur_end] is formable
        let mut farthest = 0usize;
        for i in 0..n {
            let r = i + reach[i];
            if r > farthest {
                farthest = r;
            }
            if i == cur_end {
                if farthest <= cur_end {
                    return -1;
                }
                steps += 1;
                cur_end = farthest;
                if cur_end >= n {
                    return steps;
                }
            }
        }
        -1
    }
}

fn z_function(values: &[i32]) -> Vec<usize> {
    let m = values.len();
    let mut z = vec![0usize; m];
    z[0] = m;
    let (mut left, mut right) = (0usize, 0usize);
    for i in 1..m {
        if i < right {
            z[i] = (right - i).min(z[i - left]);
        }
        while i + z[i] < m && values[z[i]] == values[i + z[i]] {
            z[i] += 1;
        }
        if i + z[i] > right {
            left = i;
            right = i + z[i];
        }
    }
    z
}
