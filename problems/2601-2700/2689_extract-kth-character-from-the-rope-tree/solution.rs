impl Solution {
    // Decode the level order: an entry of digits is an internal node, an
    // entry of letters is a leaf, and "" marks an absent child. Only
    // internal nodes occupy child slots, so only they join the queue.
    pub fn get_kth_character(root: Vec<String>, k: i32) -> String {
        let n = root.len();
        let internal: Vec<bool> = root
            .iter()
            .map(|e| {
                let b = e.as_bytes();
                !b.is_empty() && b[0].is_ascii_digit()
            })
            .collect();
        let word: Vec<String> = root
            .iter()
            .enumerate()
            .map(|(i, e)| if internal[i] { String::new() } else { e.clone() })
            .collect();
        let mut left = vec![-1i32; n];
        let mut right = vec![-1i32; n];
        let mut queue: Vec<usize> = Vec::with_capacity(n);
        if n > 0 {
            queue.push(0);
        }
        let mut i = 1usize;
        let mut head = 0usize;
        while head < queue.len() {
            let nd = queue[head];
            head += 1;
            for slot in 0..2 {
                if i >= n {
                    break;
                }
                let child = i;
                i += 1;
                if root[child].is_empty() {
                    continue;
                }
                if slot == 0 {
                    left[nd] = child as i32;
                } else {
                    right[nd] = child as i32;
                }
                if internal[child] {
                    queue.push(child);
                }
            }
        }
        // total[i] = length of S[i], computed bottom-up with an explicit
        // stack: a leaf contributes word length, an internal node the sum
        // of its children's totals.
        let mut total = vec![0i32; n];
        let mut stack: Vec<(usize, bool)> = Vec::with_capacity(2 * n);
        if n > 0 {
            stack.push((0, false));
        }
        while let Some((nd, ready)) = stack.pop() {
            if !internal[nd] {
                total[nd] = word[nd].len() as i32;
            } else if ready {
                let l = left[nd];
                let r = right[nd];
                total[nd] = (if l >= 0 { total[l as usize] } else { 0 }) + (if r >= 0 { total[r as usize] } else { 0 });
            } else {
                stack.push((nd, true));
                if right[nd] >= 0 {
                    stack.push((right[nd] as usize, false));
                }
                if left[nd] >= 0 {
                    stack.push((left[nd] as usize, false));
                }
            }
        }
        // Descend without ever building a string: the left subtree owns
        // the first total[left] characters, so k either falls inside it
        // or shifts past it into the right subtree.
        let mut nd = 0usize;
        let mut k = k;
        while internal[nd] {
            let left_len = if left[nd] >= 0 { total[left[nd] as usize] } else { 0 };
            if k <= left_len {
                nd = left[nd] as usize;
            } else {
                k -= left_len;
                nd = right[nd] as usize;
            }
        }
        word[nd].chars().nth((k - 1) as usize).unwrap().to_string()
    }
}
