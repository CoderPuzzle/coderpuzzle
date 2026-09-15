use std::cmp::Reverse;
use std::collections::BinaryHeap;
use std::collections::HashMap;

// A live distinct value is the pair (count, value); it packs into one
// i64 as count * 2e9 + value, whose numeric order is exactly
// (count, value) order.
const PACK: i64 = 2_000_000_001;
const TOP: u8 = 0;
const REST: u8 = 1;

type MinHeap = BinaryHeap<Reverse<i64>>;
type MaxHeap = BinaryHeap<i64>;

fn peek_top(top: &mut MinHeap, freq: &HashMap<i64, i64>, membership: &HashMap<i64, u8>) -> i64 {
    while let Some(&Reverse(key)) = top.peek() {
        let count = key / PACK;
        let value = key % PACK;
        if membership.get(&key) == Some(&TOP) && freq.get(&value) == Some(&count) {
            return key;
        }
        top.pop();
    }
    -1
}

fn peek_rest(rest: &mut MaxHeap, freq: &HashMap<i64, i64>, membership: &HashMap<i64, u8>) -> i64 {
    while let Some(&key) = rest.peek() {
        let count = key / PACK;
        let value = key % PACK;
        if membership.get(&key) == Some(&REST) && freq.get(&value) == Some(&count) {
            return key;
        }
        rest.pop();
    }
    -1
}

fn erase(
    top: &mut MinHeap,
    rest: &mut MaxHeap,
    freq: &HashMap<i64, i64>,
    membership: &mut HashMap<i64, u8>,
    top_size: &mut usize,
    total: &mut i64,
    erased_count: i64,
    erased_value: i64,
    x: usize,
) {
    let key = erased_count * PACK + erased_value;
    let role = match membership.remove(&key) {
        Some(role) => role,
        None => return,
    };
    if role != TOP {
        return;
    }
    *top_size -= 1;
    *total -= erased_count * erased_value;
    // refill from the best of rest
    while *top_size < x {
        let best = peek_rest(rest, freq, membership);
        if best < 0 {
            break;
        }
        rest.pop();
        membership.insert(best, TOP);
        top.push(Reverse(best));
        *top_size += 1;
        *total += (best / PACK) * (best % PACK);
    }
}

fn place(
    top: &mut MinHeap,
    rest: &mut MaxHeap,
    freq: &HashMap<i64, i64>,
    membership: &mut HashMap<i64, u8>,
    top_size: &mut usize,
    total: &mut i64,
    placed_count: i64,
    placed_value: i64,
    x: usize,
) {
    let key = placed_count * PACK + placed_value;
    if *top_size < x {
        membership.insert(key, TOP);
        top.push(Reverse(key));
        *top_size += 1;
        *total += placed_count * placed_value;
        return;
    }
    let worst = peek_top(top, freq, membership);
    if key > worst {
        // the newcomer beats the worst kept pair: swap them
        membership.insert(worst, REST);
        rest.push(worst);
        *total -= (worst / PACK) * (worst % PACK);
        *top_size -= 1;
        membership.insert(key, TOP);
        top.push(Reverse(key));
        *top_size += 1;
        *total += placed_count * placed_value;
    } else {
        membership.insert(key, REST);
        rest.push(key);
    }
}

impl Solution {
    // TOP is a min-heap and REST a max-heap of (count, value) snapshots
    // of the live distinct values: TOP's peek is the worst kept pair,
    // REST's peek the best dropped one. Each slide moves at most two
    // pairs between the heaps, and `total` follows every membership
    // change, so one O(n log n) pass answers every window; stale
    // snapshots are skipped on peek and popped when surfaced.
    pub fn find_x_sum(nums: Vec<i32>, k: i32, x: i32) -> Vec<i64> {
        let k = k as usize;
        let x = x as usize;
        let mut freq: HashMap<i64, i64> = HashMap::new();
        let mut top: MinHeap = BinaryHeap::new();
        let mut rest: MaxHeap = BinaryHeap::new();
        let mut membership: HashMap<i64, u8> = HashMap::new();
        let mut top_size = 0usize;
        let mut total = 0i64;
        let mut answer = Vec::with_capacity(nums.len() - k + 1);
        for (i, &item) in nums.iter().enumerate() {
            let value = item as i64;
            let count = *freq.get(&value).unwrap_or(&0);
            if count > 0 {
                erase(
                    &mut top,
                    &mut rest,
                    &freq,
                    &mut membership,
                    &mut top_size,
                    &mut total,
                    count,
                    value,
                    x,
                );
            }
            freq.insert(value, count + 1);
            place(
                &mut top,
                &mut rest,
                &freq,
                &mut membership,
                &mut top_size,
                &mut total,
                count + 1,
                value,
                x,
            );
            if i >= k {
                let leaving = nums[i - k] as i64;
                let mut old = freq[&leaving];
                erase(
                    &mut top,
                    &mut rest,
                    &freq,
                    &mut membership,
                    &mut top_size,
                    &mut total,
                    old,
                    leaving,
                    x,
                );
                old -= 1;
                freq.insert(leaving, old);
                if old > 0 {
                    // a count that just reached 0 leaves no pair behind
                    place(
                        &mut top,
                        &mut rest,
                        &freq,
                        &mut membership,
                        &mut top_size,
                        &mut total,
                        old,
                        leaving,
                        x,
                    );
                }
            }
            if i >= k - 1 {
                answer.push(total);
            }
        }
        answer
    }
}
