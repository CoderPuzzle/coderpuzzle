impl Solution {
    pub fn is_solvable(words: Vec<String>, result: String) -> bool {
        // Column-wise backtracking, mirroring hand addition: dfs(pos, row)
        // walks column pos of row `row`, accumulating a carry. Once every row
        // of the column is folded in, the sum's low digit must equal the
        // result letter's digit and the rest flows on as the new carry.
        let idx = |ch: u8| (ch - b'A') as usize;
        let mut seen = [false; 26];
        let mut leads = [false; 26];
        for word in &words {
            for &ch in word.as_bytes() {
                seen[idx(ch)] = true;
            }
            leads[idx(word.as_bytes()[0])] = true;
        }
        for &ch in result.as_bytes() {
            seen[idx(ch)] = true;
        }
        leads[idx(result.as_bytes()[0])] = true;
        let distinct = seen.iter().filter(|s| **s).count();
        if distinct > 10 {
            return false;
        }

        let rows: Vec<Vec<u8>> = words
            .iter()
            .map(|w| w.as_bytes().iter().rev().copied().collect())
            .collect();
        let target: Vec<u8> = result.bytes().rev().collect();
        let widest = rows.iter().map(|r| r.len()).max().unwrap_or(0);
        // No leading zeros, so the sum is at least 10^(widest-1): the result
        // needs at least `widest` digits and at most widest + 1.
        if target.len() < widest || target.len() > widest + 1 {
            return false;
        }
        let mut value = [-1i32; 26];
        let mut used = [false; 10];

        fn dfs(
            rows: &[Vec<u8>],
            target: &[u8],
            leads: &[bool; 26],
            value: &mut [i32; 26],
            used: &mut [bool; 10],
            pos: usize,
            row: usize,
            carry: i32,
        ) -> bool {
            if pos == target.len() {
                return carry == 0;
            }
            if row == rows.len() {
                // All rows folded: bind the result letter of this column.
                let digit = carry % 10;
                let ch = target[pos] as usize - 'A' as usize;
                if value[ch] != -1 {
                    return value[ch] == digit && dfs(rows, target, leads, value, used, pos + 1, 0, carry / 10);
                }
                if used[digit as usize] || (digit == 0 && leads[ch]) {
                    return false;
                }
                value[ch] = digit;
                used[digit as usize] = true;
                let ok = dfs(rows, target, leads, value, used, pos + 1, 0, carry / 10);
                if !ok {
                    used[digit as usize] = false;
                    value[ch] = -1;
                }
                ok
            } else {
                let ch = if pos < rows[row].len() {
                    rows[row][pos] as usize - 'A' as usize
                } else {
                    return dfs(rows, target, leads, value, used, pos, row + 1, carry);
                };
                if value[ch] != -1 {
                    return dfs(rows, target, leads, value, used, pos, row + 1, carry + value[ch]);
                }
                for digit in 0..10i32 {
                    if used[digit as usize] || (digit == 0 && leads[ch]) {
                        continue;
                    }
                    value[ch] = digit;
                    used[digit as usize] = true;
                    if dfs(rows, target, leads, value, used, pos, row + 1, carry + digit) {
                        return true;
                    }
                    used[digit as usize] = false;
                    value[ch] = -1;
                }
                false
            }
        }

        dfs(&rows, &target, &leads, &mut value, &mut used, 0, 0, 0)
    }
}
