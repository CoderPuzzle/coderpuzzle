impl Solution {
    pub fn number_of_weak_characters(properties: Vec<Vec<i32>>) -> i32 {
        // Attack descending; defense ASCENDING within equal attack so that
        // same-attack characters (who can never weaken each other) only
        // ever meet a running max from strictly higher-attack groups.
        let mut props = properties;
        props.sort_by(|a, b| b[0].cmp(&a[0]).then(a[1].cmp(&b[1])));
        let mut weak = 0;
        // Every earlier character has attack >= the current one's, so the
        // current one is weak exactly when some seen defense is strictly
        // greater -- one running maximum is enough.
        let mut max_defense = 0;
        for p in &props {
            if p[1] < max_defense {
                weak += 1;
            } else {
                // Raise the max only when not weak, so later (lower-attack)
                // groups compare against it.
                max_defense = p[1];
            }
        }
        weak
    }
}
