impl Solution {
    pub fn minimum_refill(plants: Vec<i32>, capacityA: i32, capacityB: i32) -> i32 {
        let mut left = 0usize;
        let mut right = plants.len() - 1;
        let mut remaining_a = capacityA;
        let mut remaining_b = capacityB;
        let mut refills = 0;

        while left < right {
            if remaining_a < plants[left] {
                remaining_a = capacityA;
                refills += 1;
            }
            remaining_a -= plants[left];

            if remaining_b < plants[right] {
                remaining_b = capacityB;
                refills += 1;
            }
            remaining_b -= plants[right];
            left += 1;
            right -= 1;
        }

        if left == right && remaining_a.max(remaining_b) < plants[left] {
            refills += 1;
        }
        refills
    }
}
