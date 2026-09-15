impl Solution {
    // Chronological sweep: order events by timestamp, offline events
    // ahead of messages at the same moment (a status change applies
    // before any message sharing its timestamp). Each user's return
    // time is the offline timestamp + 60; a message at time t sees the
    // user once that return time has passed.
    pub fn count_mentions(number_of_users: i32, events: Vec<Vec<String>>) -> Vec<i32> {
        let n = number_of_users as usize;
        let mut ordered = events;
        ordered.sort_by_key(|event| {
            let time: i64 = event[1].parse().unwrap();
            (time, if event[0] == "OFFLINE" { 0 } else { 1 })
        });
        let mut mentions = vec![0i32; n];
        let mut back_at = vec![0i64; n];
        for event in &ordered {
            let time: i64 = event[1].parse().unwrap();
            if event[0] == "OFFLINE" {
                let id: usize = event[2].parse().unwrap();
                back_at[id] = time + 60;
                continue;
            }
            for token in event[2].split(' ') {
                if token == "ALL" {
                    for count in mentions.iter_mut() {
                        *count += 1;
                    }
                } else if token == "HERE" {
                    for (count, &back) in mentions.iter_mut().zip(back_at.iter()) {
                        if back <= time {
                            *count += 1;
                        }
                    }
                } else {
                    let id: usize = token[2..].parse().unwrap();
                    mentions[id] += 1;
                }
            }
        }
        mentions
    }
}
