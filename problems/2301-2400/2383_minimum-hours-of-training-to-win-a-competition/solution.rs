impl Solution {
    // Energy only ever drains, so one shortfall computation covers
    // every fight; experience grows after each win, so top up just
    // enough whenever the next opponent is not strictly weaker.
    pub fn min_number_of_hours(
        initial_energy: i32,
        initial_experience: i32,
        energy: Vec<i32>,
        experience: Vec<i32>,
    ) -> i32 {
        let mut hours = 0i32;
        let mut e = initial_energy;
        let mut x = initial_experience;
        for i in 0..energy.len() {
            if x <= experience[i] {
                hours += experience[i] + 1 - x;
                x = experience[i] + 1;
            }
            x += experience[i];
            e -= energy[i];
        }
        if e <= 0 {
            hours += 1 - e;
        }
        hours
    }
}
