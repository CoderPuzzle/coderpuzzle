use std::collections::HashMap;

const COLORS: &[u8] = b"RYBGW";
const IMPOSSIBLE: i32 = 100; // above any answer: the hand holds at most 5 balls

impl Solution {
    pub fn find_min_step(board: String, hand: String) -> i32 {
        // Memoized search over (row, remaining hand). Only balls inserted
        // directly alongside a same-colored run are tried: a ball dropped
        // between foreign colors cannot join a removal before its neighbors
        // merge, so deferring its insertion to that merge never costs more.
        let mut counts = [0u8; 5];
        for ch in hand.bytes() {
            counts[color_of(ch)] += 1;
        }
        let mut memo = HashMap::new();
        let best = solve(&mut memo, board.as_bytes(), &mut counts);
        if best < IMPOSSIBLE {
            best
        } else {
            -1
        }
    }
}

// Index of a ball's color in the fixed RYBGW vocabulary.
fn color_of(ch: u8) -> usize {
    COLORS.iter().position(|&c| c == ch).unwrap()
}

// The cascade as a pure function: one pass drops every maximal run of three
// or more, the loop settles the joins that their removal opens up.
fn clean(row: &[u8]) -> Vec<u8> {
    let mut row = row.to_vec();
    let mut removed = true;
    while removed {
        removed = false;
        let mut kept = Vec::new();
        let mut i = 0;
        while i < row.len() {
            let mut j = i;
            while j < row.len() && row[j] == row[i] {
                j += 1;
            }
            if j - i < 3 {
                kept.extend_from_slice(&row[i..j]);
            } else {
                removed = true;
            }
            i = j;
        }
        row = kept;
    }
    row
}

// Row + b'|' + the five hand counts keys the memo; the counts stay
// single-digit (the hand holds at most 5 balls), so the concatenation is
// unambiguous.
fn solve(memo: &mut HashMap<Vec<u8>, i32>, row: &[u8], remaining: &mut [u8; 5]) -> i32 {
    if row.is_empty() {
        return 0;
    }
    let mut key = row.to_vec();
    key.push(b'|');
    for &count in remaining.iter() {
        key.push(b'0' + count);
    }
    if let Some(&seen) = memo.get(&key) {
        return seen;
    }
    let mut best = IMPOSSIBLE;
    let mut i = 0;
    while i < row.len() {
        let mut j = i;
        while j < row.len() && row[j] == row[i] {
            j += 1;
        }
        let color = color_of(row[i]);
        if remaining[color] > 0 {
            // One canonical gap per run: sliding the ball along the run it
            // joins produces the identical next row.
            remaining[color] -= 1;
            let mut inserted = row[..i].to_vec();
            inserted.push(row[i]);
            inserted.extend_from_slice(&row[i..]);
            let sub = solve(memo, &clean(&inserted), remaining);
            best = best.min(sub + 1);
            remaining[color] += 1;
        }
        i = j;
    }
    memo.insert(key, best);
    best
}
