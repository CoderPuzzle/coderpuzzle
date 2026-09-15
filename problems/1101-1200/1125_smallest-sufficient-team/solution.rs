use std::collections::HashMap;

impl Solution {
    pub fn smallest_sufficient_team(req_skills: Vec<String>, people: Vec<Vec<String>>) -> Vec<i32> {
        let mut skill_index: HashMap<&str, usize> = HashMap::new();
        for (i, skill) in req_skills.iter().enumerate() {
            skill_index.insert(skill.as_str(), i);
        }

        let np = people.len();
        // compress each person to the bitmask of skills they contribute
        let mut masks = vec![0u32; np];
        for (i, skills) in people.iter().enumerate() {
            for skill in skills {
                masks[i] |= 1u32 << skill_index[skill.as_str()];
            }
        }

        let full: u32 = (1u32 << req_skills.len()) - 1;

        // Emulate an insertion-ordered dict: entries in insertion order plus a
        // state -> position index. Updating an existing state keeps its position.
        // The dp maps each covered-skill mask to the smallest team achieving
        // it, seeded empty.
        let mut order: Vec<u32> = vec![0];
        let mut teams: Vec<Vec<i32>> = vec![Vec::new()];
        let mut pos: HashMap<u32, usize> = HashMap::new();
        pos.insert(0, 0);

        // people are processed in index order, so every subset of people is
        // tried as a candidate team
        for i in 0..np {
            let snap = order.len();
            let mut ne_order: Vec<u32> = Vec::new();
            let mut ne_teams: Vec<Vec<i32>> = Vec::new();
            let mut ne_pos: HashMap<u32, usize> = HashMap::new();
            for s in 0..snap {
                let state = order[s];
                let team = &teams[s];
                let new_state = state | masks[i];
                let mut candidate = team.clone();
                candidate.push(i as i32);
                let accept = match pos.get(&new_state) {
                    // keep the candidate only when it beats the recorded team
                    None => true,
                    Some(&idx) => teams[idx].len() > candidate.len(),
                };
                if accept {
                    let accept2 = match ne_pos.get(&new_state) {
                        None => true,
                        Some(&idx2) => ne_teams[idx2].len() > candidate.len(),
                    };
                    if accept2 {
                        match ne_pos.get(&new_state) {
                            Some(&idx2) => ne_teams[idx2] = candidate,
                            None => {
                                ne_pos.insert(new_state, ne_order.len());
                                ne_order.push(new_state);
                                ne_teams.push(candidate);
                            }
                        }
                    }
                }
            }
            for (k, &ns) in ne_order.iter().enumerate() {
                match pos.get(&ns) {
                    Some(&idx) => teams[idx] = ne_teams[k].clone(),
                    None => {
                        pos.insert(ns, order.len());
                        order.push(ns);
                        teams.push(ne_teams[k].clone());
                    }
                }
            }
        }

        // team covering every required skill, sorted for a deterministic order
        let mut res = teams[pos[&full]].clone();
        res.sort_unstable();
        res
    }
}
