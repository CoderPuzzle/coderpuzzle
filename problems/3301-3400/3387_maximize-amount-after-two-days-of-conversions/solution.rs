use std::collections::HashMap;

impl Solution {
    pub fn max_amount(
        initialCurrency: String,
        pairs1: Vec<Vec<String>>,
        rates1: Vec<f64>,
        pairs2: Vec<Vec<String>>,
        rates2: Vec<f64>,
    ) -> f64 {
        struct Edge {
            target: usize,
            rate: f64,
            forward: bool,
        }
        // Assign each currency its first-appearance index.
        fn intern<'a>(ids: &mut HashMap<&'a str, usize>, name: &'a str) -> usize {
            if let Some(&id) = ids.get(name) {
                return id;
            }
            let id = ids.len();
            ids.insert(name, id);
            id
        }
        fn build<'a>(pairs: &'a [Vec<String>], rates: &[f64], ids: &mut HashMap<&'a str, usize>) -> Vec<Vec<Edge>> {
            let mut graph: Vec<Vec<Edge>> = Vec::with_capacity(ids.len());
            for (pair, &rate) in pairs.iter().zip(rates.iter()) {
                let start = intern(ids, &pair[0]);
                let target = intern(ids, &pair[1]);
                graph.resize_with(ids.len(), Vec::new);
                graph[start].push(Edge {
                    target,
                    rate,
                    forward: true,
                });
                graph[target].push(Edge {
                    target: start,
                    rate,
                    forward: false,
                });
            }
            graph
        }
        // Day 1 ends holding some intermediate currency c, and day 2
        // converts c back to initialCurrency. Rates are consistent (no
        // contradictions), so the first BFS visit to a currency already
        // carries its maximum amount: day 1 is one BFS from initialCurrency
        // (forward edges multiply by the rate, reverse edges divide by it),
        // and day 2 reruns the same BFS from every currency reached on
        // day 1, carrying that currency's amount. The answer is the largest
        // amount of initialCurrency any of those searches ends with.
        let mut ids: HashMap<&str, usize> = HashMap::new();
        // initialCurrency is registered first: it may appear in no pair.
        let source = intern(&mut ids, &initialCurrency);
        let day1 = build(&pairs1, &rates1, &mut ids);
        let day2 = build(&pairs2, &rates2, &mut ids);
        let n = ids.len();
        // Amounts are always positive, so -1.0 marks "not visited yet".
        let mut day1_amount = vec![-1.0f64; n];
        let mut order: Vec<usize> = Vec::new();
        day1_amount[source] = 1.0;
        order.push(source);
        let mut head = 0;
        while head < order.len() {
            let currency = order[head];
            head += 1;
            for edge in &day1[currency] {
                if day1_amount[edge.target] >= 0.0 {
                    continue;
                }
                let base = day1_amount[currency];
                day1_amount[edge.target] = if edge.forward {
                    base * edge.rate
                } else {
                    base / edge.rate
                };
                order.push(edge.target);
            }
        }
        let mut best = 0.0f64;
        for &start in &order {
            let mut amount = vec![-1.0f64; n];
            amount[start] = day1_amount[start];
            let mut queue: Vec<usize> = vec![start];
            let mut head = 0;
            while head < queue.len() {
                let currency = queue[head];
                head += 1;
                for edge in &day2[currency] {
                    if amount[edge.target] >= 0.0 {
                        continue;
                    }
                    let base = amount[currency];
                    amount[edge.target] = if edge.forward {
                        base * edge.rate
                    } else {
                        base / edge.rate
                    };
                    queue.push(edge.target);
                }
            }
            // Unreached initialCurrency leaves -1.0, never the maximum.
            best = best.max(amount[source]);
        }
        best
    }
}
