use std::collections::HashMap;

impl Solution {
    pub fn calc_equation(equations: Vec<Vec<String>>, values: Vec<f64>, queries: Vec<Vec<String>>) -> Vec<f64> {
        // Weighted union-find over the variable names: weight[x] always holds
        // x / parent[x], so the product along a parent chain is the member's
        // ratio to its root.
        let mut parent: HashMap<String, String> = HashMap::new();
        let mut weight: HashMap<String, f64> = HashMap::new();
        let mut size: HashMap<String, usize> = HashMap::new();
        // Each stated ratio a / b = v becomes one merge of the two variables.
        for (pair, &value) in equations.iter().zip(values.iter()) {
            for node in [&pair[0], &pair[1]] {
                if !parent.contains_key(node.as_str()) {
                    parent.insert(node.clone(), node.clone());
                    weight.insert(node.clone(), 1.0);
                    size.insert(node.clone(), 1);
                }
            }
            Self::unite(&mut parent, &mut weight, &mut size, &pair[0], &pair[1], value);
        }
        queries
            .iter()
            .map(|q| Self::query(&mut parent, &mut weight, &q[0], &q[1]))
            .collect()
    }

    fn find(parent: &mut HashMap<String, String>, weight: &mut HashMap<String, f64>, x: &str) -> (String, f64) {
        // Walk up to the root folding the chain into one node / root
        // product, then re-hang every visited node directly on the root
        // (path compression), each stored weight becoming that product.
        let mut root = x.to_string();
        let mut product = 1.0;
        while parent[&root].as_str() != root.as_str() {
            product *= weight[&root];
            root = parent[&root].clone();
        }
        let mut node = x.to_string();
        let mut quotient = product;
        while parent[&node].as_str() != root.as_str() {
            let next = parent[&node].clone();
            let step = weight[&node];
            parent.insert(node.clone(), root.clone());
            weight.insert(node.clone(), quotient);
            node = next;
            quotient /= step;
        }
        (root, product)
    }

    fn unite(
        parent: &mut HashMap<String, String>,
        weight: &mut HashMap<String, f64>,
        size: &mut HashMap<String, usize>,
        a: &str,
        b: &str,
        mut value: f64,
    ) {
        // Fold one stated ratio a / b = value into the forest.
        let (mut root_a, mut ratio_a) = Self::find(parent, weight, a);
        let (mut root_b, mut ratio_b) = Self::find(parent, weight, b);
        if root_a == root_b {
            // The batch never contradicts itself, so a ratio restating an
            // existing link agrees with the folded product.
            return;
        }
        if size[&root_a] < size[&root_b] {
            // Union by size: hang the smaller tree under the larger.
            std::mem::swap(&mut root_a, &mut root_b);
            std::mem::swap(&mut ratio_a, &mut ratio_b);
            value = 1.0 / value;
        }
        // a = value * b written in root terms, ratio_a * root_a =
        // value * ratio_b * root_b, solves the new weight root_b / root_a.
        parent.insert(root_b.clone(), root_a.clone());
        weight.insert(root_b.clone(), ratio_a / (value * ratio_b));
        let merged = size[&root_a] + size[&root_b];
        size.insert(root_a.clone(), merged);
    }

    fn query(parent: &mut HashMap<String, String>, weight: &mut HashMap<String, f64>, start: &str, end: &str) -> f64 {
        // An unknown variable is unanswerable (this also covers x / x for
        // an undefined x); a known variable over itself is 1.0.
        if !parent.contains_key(start) || !parent.contains_key(end) {
            return -1.0;
        }
        let (root_start, ratio_start) = Self::find(parent, weight, start);
        let (root_end, ratio_end) = Self::find(parent, weight, end);
        if root_start != root_end {
            // Different roots mean no stated ratio links the two groups.
            return -1.0;
        }
        ratio_start / ratio_end
    }
}
