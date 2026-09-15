impl Solution {
    pub fn guess_majority(array_reader: &mut ArrayReader) -> i32 {
        let n = array_reader.length();
        // Compare the fixed trio {0, 1, 2} against every later index.
        // The answer depends only on nums[i], so it takes exactly one
        // of two values across the whole array — every i lands in one
        // of two buckets, though which bucket means what is still
        // unknown.
        let mut results: Vec<(i32, i32)> = Vec::new();
        let mut seen4 = false;
        let mut seen0 = false;
        for i in 3..n {
            let r = array_reader.query(0, 1, 2, i);
            results.push((i, r));
            if r == 4 {
                seen4 = true;
            } else if r == 0 {
                seen0 = true;
            }
        }

        if seen4 || seen0 {
            // A 4 means the trio is unanimous: it contributes 3 to the
            // bucket matching its own value and 0 to the other. A 0
            // (with no 4 seen) means the trio is a genuine 2-1 split:
            // the bucket answered 2 matches the trio's majority value
            // (contributing 2), the bucket answered 0 is the minority
            // (contributing 1).
            let (match_result, anchor_match, anchor_diff, have_match_index) =
                if seen4 { (4, 3, 0, true) } else { (2, 2, 1, false) };
            let diff_result = if seen4 { 2 } else { 0 };

            let count_match = results.iter().filter(|(_, r)| *r == match_result).count() as i32;
            let count_diff = results.len() as i32 - count_match;
            let total_match = count_match + anchor_match;
            let total_diff = count_diff + anchor_diff;

            if total_match == total_diff {
                return -1;
            }
            if total_match > total_diff {
                if have_match_index {
                    return 0;
                }
                for &(i, r) in &results {
                    if r == match_result {
                        return i;
                    }
                }
            } else {
                for &(i, r) in &results {
                    if r == diff_result {
                        return i;
                    }
                }
            }
            unreachable!();
        }

        // Every query answered 2: the per-index answer is injective, so
        // a constant answer forces a constant hidden value v for every
        // index from 3 onward (n >= 5 guarantees indices 3 and 4 both
        // exist). One more call pits the trio's first two entries
        // against that known-equal pair; combined with the 3-1 split
        // already seen at index 3, it pins down how many of the trio
        // equal v.
        let v_index = 3;
        let r2 = array_reader.query(0, 1, 3, 4);
        let tail = n - 3;
        let (trio_matches_v, other_index) = match r2 {
            // nums[0] == nums[1] == v, and the earlier 3-1 split forces
            // nums[2] to be the lone entry different from v.
            4 => (2, 2),
            // nums[0] == nums[1] == the value other than v; the 3-1
            // split then forces nums[2] to match them, not v.
            0 => (0, 0),
            // Exactly one of nums[0], nums[1] equals v; the 3-1 split
            // forces nums[2] == v to reach a total of two trio members
            // matching v. The other value never wins this branch (its
            // count never exceeds 1 while v's count is at least n - 4),
            // so no index for it is ever needed.
            _ => (2, -1),
        };

        let count_v = tail + trio_matches_v;
        let count_other = 3 - trio_matches_v;
        if count_v == count_other {
            return -1;
        }
        if count_v > count_other {
            v_index
        } else {
            other_index
        }
    }
}
