impl Solution {
    pub fn find_all_recipes(recipes: Vec<String>, ingredients: Vec<Vec<String>>, supplies: Vec<String>) -> Vec<String> {
        let have: std::collections::HashSet<&String> = supplies.iter().collect();
        let mut index: std::collections::HashMap<&String, usize> = std::collections::HashMap::new();
        for (i, name) in recipes.iter().enumerate() {
            index.insert(name, i);
        }
        let n = recipes.len();
        let mut dependents: Vec<Vec<usize>> = vec![Vec::new(); n];
        let mut indegree = vec![0usize; n];
        let mut impossible = vec![false; n];
        for i in 0..n {
            let mut seen: std::collections::HashSet<usize> = std::collections::HashSet::new();
            for item in &ingredients[i] {
                // An initial supply satisfies the requirement outright.
                if have.contains(item) {
                    continue;
                }
                match index.get(item) {
                    // Neither supply nor recipe: never makeable.
                    None => impossible[i] = true,
                    Some(&j) => {
                        // seen dedupes repeated ingredients so the indegree
                        // counts each recipe dependency once.
                        if seen.insert(j) {
                            indegree[i] += 1;
                            dependents[j].push(i);
                        }
                    }
                }
            }
        }

        // Kahn's algorithm: recipes needing nothing beyond the supplies start
        // made; cycles never reach indegree zero and drop out automatically.
        let mut queue: std::collections::VecDeque<usize> = std::collections::VecDeque::new();
        for i in 0..n {
            if indegree[i] == 0 && !impossible[i] {
                queue.push_back(i);
            }
        }
        let mut made: Vec<String> = Vec::new();
        while let Some(i) = queue.pop_front() {
            made.push(recipes[i].clone());
            for &j in &dependents[i] {
                // Skip impossible recipes so their failure never blocks or
                // corrupts the rest.
                if impossible[j] {
                    continue;
                }
                indegree[j] -= 1;
                if indegree[j] == 0 {
                    queue.push_back(j);
                }
            }
        }
        made.sort();
        made
    }
}
