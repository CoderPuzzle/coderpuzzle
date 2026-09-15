impl Solution {
    // Every unit costs one pickup minute; each truck drives exactly to
    // the last house holding its type. Track those last indices, then
    // add prefix travel once per type that appears past house 0.
    pub fn garbage_collection(garbage: Vec<String>, travel: Vec<i32>) -> i32 {
        let mut minutes = 0i32;
        let mut last = [-1i32; 3];
        for (i, g) in garbage.iter().enumerate() {
            minutes += g.len() as i32;
            for c in g.chars() {
                last[match c {
                    'M' => 0,
                    'P' => 1,
                    _ => 2,
                }] = i as i32;
            }
        }
        let mut prefix = 0i32;
        for i in 1..garbage.len() {
            prefix += travel[i - 1];
            for t in 0..3 {
                if last[t] == i as i32 {
                    minutes += prefix;
                    last[t] = -1;
                }
            }
        }
        minutes
    }
}
