impl Solution {
    pub fn odd_even_jumps(arr: Vec<i32>) -> i32 {
        // The jump out of every index is forced: an odd jump lands on the
        // smallest value >= arr[i] to the right, an even jump on the largest
        // value <= arr[i], and ties go to the smallest index. Build both
        // jump tables with one sort and one stack each: walk the indices
        // ordered by (value, index) — by (negated value, index) for the
        // even table — and each newcomer resolves every still-open index
        // standing to its left, because the first walker with a larger
        // original index is exactly the forced target. Then sweep from the
        // right: odd_ok[i] holds when the odd target's even_ok holds,
        // even_ok[i] when the even target's odd_ok holds, the last index is
        // good under both with zero jumps, and the answer counts the
        // odd_ok starts — every good start opens with an odd jump.
        let n = arr.len();
        let higher = Self::jump_table(&arr, false);
        let lower = Self::jump_table(&arr, true);
        let mut odd_ok = vec![false; n];
        let mut even_ok = vec![false; n];
        odd_ok[n - 1] = true;
        even_ok[n - 1] = true;
        let mut count = 1;
        for i in (0..n - 1).rev() {
            let j = higher[i];
            if j != -1 && even_ok[j as usize] {
                odd_ok[i] = true;
            }
            let j = lower[i];
            if j != -1 && odd_ok[j as usize] {
                even_ok[i] = true;
            }
            if odd_ok[i] {
                count += 1;
            }
        }
        count
    }

    // Stack of indices still waiting for their forced target; the first
    // walker standing further right resolves each of them.
    fn jump_table(arr: &[i32], descending: bool) -> Vec<i32> {
        let n = arr.len();
        let mut order: Vec<usize> = (0..n).collect();
        order.sort_by(|&a, &b| {
            let values = if descending {
                arr[b].cmp(&arr[a])
            } else {
                arr[a].cmp(&arr[b])
            };
            values.then(a.cmp(&b))
        });
        let mut table = vec![-1; n];
        let mut stack: Vec<usize> = Vec::with_capacity(n);
        for j in order {
            while let Some(&top) = stack.last() {
                if top >= j {
                    break;
                }
                table[top] = j as i32;
                stack.pop();
            }
            stack.push(j);
        }
        table
    }
}
