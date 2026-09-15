impl Solution {
    pub fn asteroids_destroyed(mass: i32, mut asteroids: Vec<i32>) -> bool {
        asteroids.sort_unstable();
        let mut current_mass = i64::from(mass);
        for asteroid in asteroids {
            if current_mass < i64::from(asteroid) {
                return false;
            }
            current_mass += i64::from(asteroid);
        }
        true
    }
}
