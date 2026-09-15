use std::collections::{HashMap, HashSet, VecDeque};

impl Solution {
    pub fn num_buses_to_destination(routes: Vec<Vec<i32>>, source: i32, target: i32) -> i32 {
        // Early exits: same stop needs no bus; an endpoint on no route
        // has no path.
        if source == target {
            return 0;
        }
        // Map each stop to the routes passing through it.
        let mut stop_to_routes: HashMap<i32, Vec<usize>> = HashMap::new();
        for (r, stops) in routes.iter().enumerate() {
            for &s in stops {
                stop_to_routes.entry(s).or_default().push(r);
            }
        }
        if !stop_to_routes.contains_key(&source) || !stop_to_routes.contains_key(&target) {
            return -1;
        }
        let mut used_routes: HashSet<usize> = HashSet::new();
        let mut seen_stops: HashSet<i32> = HashSet::new();
        seen_stops.insert(source);
        let mut queue: VecDeque<(i32, i32)> = VecDeque::new();
        queue.push_back((source, 0));
        while let Some((stop, buses)) = queue.pop_front() {
            let empty: Vec<usize> = Vec::new();
            let list = stop_to_routes.get(&stop).unwrap_or(&empty);
            for &r in list {
                // BFS over stops: boarding a route reaches all its
                // stops one level deeper. Expand each route only once
                // ever — re-boarding can only revisit stops already
                // found at an equal or smaller ride count.
                if used_routes.contains(&r) {
                    continue;
                }
                used_routes.insert(r);
                for &nxt in &routes[r] {
                    // The target is counted on sight — no need to
                    // enqueue it.
                    if nxt == target {
                        return buses + 1;
                    }
                    if seen_stops.insert(nxt) {
                        queue.push_back((nxt, buses + 1));
                    }
                }
            }
        }
        -1
    }
}
