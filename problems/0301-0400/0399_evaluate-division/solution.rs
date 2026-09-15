use std::collections::{HashMap, HashSet, VecDeque};

impl Solution {
    pub fn calc_equation(equations: Vec<Vec<String>>, values: Vec<f64>, queries: Vec<Vec<String>>) -> Vec<f64> {
        // node -> adjacency list of (neighbor, weight) in insertion order;
        // re-adding an edge overwrites its weight in place (like Python dict).
        let mut graph: HashMap<String, Vec<(String, f64)>> = HashMap::new();
        // Each equation a/b = v becomes a directed edge a -> b of weight v
        // plus the reverse edge of weight 1/v (division inverts with direction).
        for (pair, &value) in equations.iter().zip(values.iter()) {
            let a = pair[0].clone();
            let b = pair[1].clone();
            Self::add_edge(&mut graph, a.clone(), b.clone(), value);
            Self::add_edge(&mut graph, b, a, 1.0 / value);
        }
        queries.iter().map(|q| Self::query(&graph, &q[0], &q[1])).collect()
    }

    fn add_edge(graph: &mut HashMap<String, Vec<(String, f64)>>, a: String, b: String, w: f64) {
        let adj = graph.entry(a).or_insert_with(Vec::new);
        for edge in adj.iter_mut() {
            if edge.0 == b {
                edge.1 = w;
                return;
            }
        }
        adj.push((b, w));
    }

    fn query(graph: &HashMap<String, Vec<(String, f64)>>, start: &str, end: &str) -> f64 {
        // An unknown variable is unanswerable (this also covers x / x for
        // an undefined x); a known variable over itself is 1.0.
        if !graph.contains_key(start) || !graph.contains_key(end) {
            return -1.0;
        }
        if start == end {
            return 1.0;
        }
        // BFS carrying the running product: weights along the path telescope
        // to start / end because intermediate variables cancel.
        let mut seen: HashSet<&str> = HashSet::new();
        seen.insert(start);
        let mut queue: VecDeque<(&str, f64)> = VecDeque::new();
        queue.push_back((start, 1.0));
        while let Some((node, product)) = queue.pop_front() {
            for (neighbor, weight) in graph[node].iter() {
                if neighbor.as_str() == end {
                    // Equations are consistent, so the first path found
                    // already yields the correct quotient.
                    return product * weight;
                }
                if !seen.contains(neighbor.as_str()) {
                    seen.insert(neighbor.as_str());
                    queue.push_back((neighbor, product * weight));
                }
            }
        }
        -1.0
    }
}
