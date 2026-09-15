impl Solution {
    pub fn max_active_sections_after_trade(s: String, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let bytes = s.as_bytes();
        let length = bytes.len();
        let ones = bytes.iter().filter(|&&c| c == b'1').count() as i32;
        // Maximal runs of '0's, as parallel start/length arrays; the optimal
        // trade zeroes the '1' run between two zero runs and flips the merge.
        let mut starts: Vec<usize> = Vec::new();
        let mut lens: Vec<i32> = Vec::new();
        let mut index = 0;
        while index < length {
            if bytes[index] == b'0' {
                let run_start = index;
                while index < length && bytes[index] == b'0' {
                    index += 1;
                }
                starts.push(run_start);
                lens.push((index - run_start) as i32);
            } else {
                index += 1;
            }
        }
        let groups = starts.len();
        let ends: Vec<i32> = (0..groups).map(|k| (starts[k] + lens[k] as usize - 1) as i32).collect();

        // Sparse table for range maximum over adjacent sums lens[k]+lens[k+1].
        let size = groups as i64 - 1;
        let mut levels = 0_i64;
        while (1_i64 << levels) <= size {
            levels += 1;
        }
        let levels = levels as usize;
        let mut table: Vec<Vec<i32>> = Vec::new();
        let mut logs: Vec<usize> = vec![0; (size.max(0) + 1) as usize];
        if size >= 1 {
            let size = size as usize;
            table.push((0..size).map(|k| lens[k] + lens[k + 1]).collect());
            for level in 1..levels {
                let step = 1_usize << (level - 1);
                let mut row = vec![0_i32; size - (1 << level) + 1];
                for (q, value) in row.iter_mut().enumerate() {
                    *value = table[level - 1][q].max(table[level - 1][q + step]);
                }
                table.push(row);
            }
            for q in 2..=size {
                logs[q] = logs[q / 2] + 1;
            }
        }

        let mut answer: Vec<i32> = Vec::with_capacity(queries.len());
        for query in &queries {
            let left = query[0];
            let right = query[1];
            let mut gain = 0_i32;
            if groups >= 2 {
                // Zero runs clipped by the window edges only shrink the two
                // boundary pairs; every fully interior pair is exact.
                let first = ends.partition_point(|&end| end < left);
                let last = starts.partition_point(|&start| start <= right as usize) as i64 - 2;
                if first as i64 <= last {
                    let first = first as usize;
                    let last = last as usize;
                    let clip_left = lens[first].min(ends[first] - left + 1);
                    let clip_right = lens[last + 1].min(right - starts[last + 1] as i32 + 1);
                    let (pair_first, pair_last);
                    if first == last {
                        pair_first = clip_left + clip_right;
                        pair_last = pair_first;
                    } else {
                        pair_first = clip_left + lens[first + 1];
                        pair_last = lens[last] + clip_right;
                    }
                    let mut inner_lo = first as i64;
                    if bytes[left as usize] == b'0' {
                        inner_lo += 1;
                    }
                    let mut inner_hi = last as i64;
                    if bytes[right as usize] == b'0' {
                        inner_hi -= 1;
                    }
                    let mut inner = 0_i32;
                    if inner_lo <= inner_hi {
                        let level = logs[(inner_hi - inner_lo + 1) as usize];
                        let row = &table[level];
                        inner = row[inner_lo as usize].max(row[inner_hi as usize - (1 << level) + 1]);
                    }
                    gain = pair_first.max(pair_last).max(inner);
                }
            }
            answer.push(ones + gain);
        }
        answer
    }
}
