impl Solution {
    pub fn find_duplicate(nums: Vec<i32>) -> i32 {
        // The implicit linked list: index i points to nums[i]. The
        // duplicate is the cycle entry, since two indices point at it.
        let idx = |v: i32| nums[v as usize];
        let mut slow = 0i32;
        let mut fast = 0i32;
        loop {
            // Tortoise hops once, hare twice; index 0 cannot lie inside
            // the cycle (no value equals 0), so they always meet.
            slow = idx(slow);
            fast = idx(idx(fast));
            if slow == fast {
                break;
            }
        }
        // mu == lambda (mod cycle length), so advancing both one step at
        // a time makes them meet exactly at the cycle's entry node.
        slow = 0;
        while slow != fast {
            slow = idx(slow);
            fast = idx(fast);
        }
        // The entry index is the duplicated value.
        slow
    }
}
