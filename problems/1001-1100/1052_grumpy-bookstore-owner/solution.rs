impl Solution {
    pub fn max_satisfied(customers: Vec<i32>, grumpy: Vec<i32>, minutes: i32) -> i32 {
        let minutes = minutes as usize;
        let base: i32 = customers
            .iter()
            .zip(grumpy.iter())
            .filter(|&(_, &g)| g == 0)
            .map(|(&c, _)| c)
            .sum();

        let mut window: i32 = (0..minutes).filter(|&i| grumpy[i] == 1).map(|i| customers[i]).sum();
        let mut best = window;
        for i in minutes..customers.len() {
            if grumpy[i] == 1 {
                window += customers[i];
            }
            if grumpy[i - minutes] == 1 {
                window -= customers[i - minutes];
            }
            best = best.max(window);
        }

        base + best
    }
}
