impl Solution {
    pub fn min_number_of_semesters(n: i32, relations: Vec<Vec<i32>>, k: i32) -> i32 {
        let n = n as usize;
        let k = k as usize;
        // prereq[i] = bitmask of courses that must precede course i.
        let mut prereq = vec![0usize; n];
        for relation in &relations {
            prereq[relation[1] as usize - 1] |= 1usize << (relation[0] as usize - 1);
        }
        let full = (1usize << n) - 1;
        // dp[mask] = min semesters to have taken exactly the courses in mask.
        // Every transition only adds bits, so the target mask is numerically
        // larger — increasing order finalizes every predecessor first.
        // The n+1 sentinel parks unreachable states.
        let unreachable = n as i32 + 1;
        let mut dp = vec![unreachable; full + 1];
        dp[0] = 0;

        fn relax(state: usize, candidate: i32, dp: &mut [i32]) {
            if candidate < dp[state] {
                dp[state] = candidate;
            }
        }
        // Enumerate every exactly-need-sized subset of bits[start..] by recursion.
        fn choose(bits: &[usize], start: usize, need: usize, taken: usize, steps: i32, dp: &mut [i32]) {
            if need == 0 {
                relax(taken, steps + 1, dp);
                return;
            }
            let mut i = start;
            while i + need <= bits.len() {
                choose(bits, i + 1, need - 1, taken | (1usize << bits[i]), steps, dp);
                i += 1;
            }
        }

        for mask in 0..full {
            if dp[mask] == unreachable {
                continue;
            }
            // Available = untaken courses whose prerequisite set already sits
            // inside mask (one AND per course).
            let mut avail = 0usize;
            for course in 0..n {
                if mask >> course & 1 == 0 && prereq[course] & !mask == 0 {
                    avail |= 1usize << course;
                }
            }
            if avail == 0 {
                continue;
            }
            let bits: Vec<usize> = (0..n).filter(|&c| avail >> c & 1 == 1).collect();
            // Fewer than k available: take them all in a single semester.
            if bits.len() <= k {
                relax(mask | avail, dp[mask] + 1, &mut dp);
            } else {
                // Taking an extra available course never hurts, so only
                // semesters that take exactly k courses need examining.
                choose(&bits, 0, k, mask, dp[mask], &mut dp);
            }
        }
        dp[full]
    }
}
