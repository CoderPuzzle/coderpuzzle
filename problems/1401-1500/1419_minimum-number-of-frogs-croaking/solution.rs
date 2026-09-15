impl Solution {
    pub fn min_number_of_frogs(croak_of_frogs: String) -> i32 {
        let order = b"croak";
        let mut counts = [0i32; 5];
        let mut active = 0;
        let mut answer = 0;
        for &ch in croak_of_frogs.as_bytes() {
            let index = order.iter().position(|&c| c == ch);
            let index = match index {
                Some(i) => i,
                None => return -1,
            };
            if index == 0 {
                counts[0] += 1;
                active += 1;
                answer = answer.max(active);
            } else {
                if counts[index - 1] == 0 {
                    return -1;
                }
                counts[index - 1] -= 1;
                counts[index] += 1;
                if index == 4 {
                    active -= 1;
                }
            }
        }
        for i in 0..4 {
            if counts[i] != 0 {
                return -1;
            }
        }
        answer
    }
}
