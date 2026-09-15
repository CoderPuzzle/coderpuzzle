impl Solution {
    pub fn remove_zero_sum_sublists(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut values: Vec<i32> = Vec::new();
        let mut node = head.as_deref();
        while let Some(current) = node {
            values.push(current.val);
            node = current.next.as_deref();
        }

        // Prefix-sum scan: when a prefix repeats, drop every node between the
        // earlier occurrence and the current node (inclusive), then restart.
        let mut restart = true;
        while restart {
            restart = false;
            let mut prefix_to_index: std::collections::HashMap<i32, i32> = std::collections::HashMap::new();
            prefix_to_index.insert(0, -1);
            let mut prefix: i32 = 0;
            let mut i = 0usize;
            while i < values.len() {
                prefix += values[i];
                if let Some(&j) = prefix_to_index.get(&prefix) {
                    let j = (j + 1) as usize;
                    values.drain(j..i + 1);
                    restart = true;
                    break;
                }
                prefix_to_index.insert(prefix, i as i32);
                i += 1;
            }
        }

        let mut result: Option<Box<ListNode>> = None;
        for &value in values.iter().rev() {
            result = Some(Box::new(ListNode {
                val: value,
                next: result,
            }));
        }
        result
    }
}
