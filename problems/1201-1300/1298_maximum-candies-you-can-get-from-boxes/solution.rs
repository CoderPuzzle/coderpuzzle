use std::collections::VecDeque;

impl Solution {
    pub fn max_candies(
        mut status: Vec<i32>,
        candies: Vec<i32>,
        keys: Vec<Vec<i32>>,
        contained_boxes: Vec<Vec<i32>>,
        initial_boxes: Vec<i32>,
    ) -> i64 {
        // Two waiting rooms: owned-but-locked boxes, and the openable queue.
        let n = status.len();
        let mut locked_held = vec![false; n];
        let mut opened = vec![false; n];
        let mut total: i64 = 0;
        let mut queue: VecDeque<usize> = VecDeque::new();

        for b in initial_boxes {
            acquire(b as usize, &status, &opened, &mut locked_held, &mut queue);
        }

        while let Some(b) = queue.pop_front() {
            if opened[b] {
                continue;
            }
            opened[b] = true;
            total += candies[b] as i64;
            for k in &keys[b] {
                let k = *k as usize;
                status[k] = 1;
                if locked_held[k] {
                    // The key only matters for a box already owned and
                    // parked; release it into the queue once it unlocks.
                    locked_held[k] = false;
                    queue.push_back(k);
                }
            }
            for c in &contained_boxes[b] {
                acquire(*c as usize, &status, &opened, &mut locked_held, &mut queue);
            }
        }
        total
    }
}

// Ownership event: an initial box, or one found inside another.
fn acquire(box_index: usize, status: &[i32], opened: &[bool], locked_held: &mut [bool], queue: &mut VecDeque<usize>) {
    if opened[box_index] || locked_held[box_index] {
        return;
    }
    if status[box_index] == 1 {
        queue.push_back(box_index);
    } else {
        locked_held[box_index] = true;
    }
}
