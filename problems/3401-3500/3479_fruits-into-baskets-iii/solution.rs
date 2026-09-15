impl Solution {
    pub fn num_of_unplaced_fruits(fruits: Vec<i32>, baskets: Vec<i32>) -> i32 {
        // Max segment tree over basket indices: each node holds the largest
        // capacity still free in its range, so "any basket here fits?" is one
        // comparison and the leftmost such basket is a root-to-leaf walk that
        // keeps left whenever the left subtree can still fit the fruit.
        let n = baskets.len();
        let mut size = 1usize;
        while size < n {
            size *= 2;
        }
        let mut tree = vec![0i32; 2 * size];
        for (j, &capacity) in baskets.iter().enumerate() {
            tree[size + j] = capacity;
        }
        for i in (1..size).rev() {
            tree[i] = tree[2 * i].max(tree[2 * i + 1]);
        }
        let mut unplaced = 0;
        for &quantity in &fruits {
            if tree[1] < quantity {
                // even the global maximum is too small: nothing fits anywhere
                unplaced += 1;
                continue;
            }
            let mut node = 1usize;
            while node < size {
                node *= 2;
                if tree[node] < quantity {
                    node += 1;
                }
            }
            // retire the basket: 0 sits below every legal capacity
            tree[node] = 0;
            node /= 2;
            while node > 0 {
                tree[node] = tree[2 * node].max(tree[2 * node + 1]);
                node /= 2;
            }
        }
        unplaced
    }
}
