use std::collections::{HashMap, HashSet};

// The merge runs on plain records keyed by node value — (val, left child
// val, right child val) — because every attachment decision is by value.
type Rec = (i32, Option<i32>, Option<i32>);

fn collect(recs: &mut HashMap<i32, Rec>, root: &TreeNode) {
    let mut stack = vec![root];
    while let Some(nd) = stack.pop() {
        // Root records are authoritative: a value that roots one tree may
        // also appear as a leaf of another, and the leaf record (no kids of
        // its own in THAT tree) must never clobber the root's real children.
        recs.entry(nd.val).or_insert((
            nd.val,
            nd.left.as_ref().map(|c| c.val),
            nd.right.as_ref().map(|c| c.val),
        ));
        if let Some(c) = &nd.left {
            stack.push(c);
        }
        if let Some(c) = &nd.right {
            stack.push(c);
        }
    }
}

impl Solution {
    pub fn can_merge(trees: Vec<Option<Box<TreeNode>>>) -> Option<Box<TreeNode>> {
        // Duplicate leaf values make merging impossible outright, since a
        // valid BST holds each value exactly once.
        let mut leaf_seen: HashSet<i32> = HashSet::new();
        for root in trees.iter().flatten() {
            for child in [&root.left, &root.right].into_iter().flatten() {
                if !leaf_seen.insert(child.val) {
                    return None;
                }
            }
        }

        // The final root is the unique root value that never appears as a
        // leaf of another tree.
        let mut candidates: Vec<usize> = Vec::new();
        for (i, r) in trees.iter().enumerate() {
            if !leaf_seen.contains(&r.as_ref().unwrap().val) {
                candidates.push(i);
            }
        }
        if candidates.len() != 1 {
            return None;
        }
        let root_idx = candidates[0];

        // Flatten every input tree into the record table. Root records are
        // seeded first (a root's children are authoritative over the same
        // value's leaf slot in another tree), then each tree is walked with
        // entry().or_insert so nothing overwrites them.
        let mut recs: HashMap<i32, Rec> = HashMap::new();
        for r in trees.iter().flatten() {
            recs.insert(
                r.val,
                (r.val, r.left.as_ref().map(|c| c.val), r.right.as_ref().map(|c| c.val)),
            );
        }
        for r in trees.iter().flatten() {
            collect(&mut recs, r);
        }

        let roots: Vec<i32> = trees.iter().map(|r| r.as_ref().unwrap().val).collect();
        let root_val = roots[root_idx];

        // Live material: kids maps each reachable node value to its current
        // children. Seeded ONLY from the final tree's own root record — a
        // child slot opens kidless, and deeper structure belongs to other,
        // still-pending trees until they splice in.
        let mut kids: HashMap<i32, (Option<i32>, Option<i32>)> = HashMap::new();
        let (_, rl, rr) = recs[&root_val];
        kids.insert(root_val, (rl, rr));
        for c in [rl, rr].into_iter().flatten() {
            kids.insert(c, (None, None));
        }

        let mut attached = vec![false; trees.len()];
        attached[root_idx] = true;
        let mut remaining = trees.len() - 1;
        while remaining > 0 {
            let mut progressed = false;
            for i in 0..trees.len() {
                if attached[i] {
                    continue;
                }
                let v = roots[i];
                match kids.get(&v) {
                    Some((None, None)) if v != root_val => {
                        // Leaf slot holding this tree's root value: splice.
                        // The incoming children open kidless; anything below
                        // them belongs to further pending trees.
                        let (_, cl, cr) = recs[&v];
                        kids.insert(v, (cl, cr));
                        for c in [cl, cr].into_iter().flatten() {
                            kids.insert(c, (None, None));
                        }
                        attached[i] = true;
                        remaining -= 1;
                        progressed = true;
                    }
                    _ => {}
                }
            }
            if !progressed {
                return None;
            }
        }

        // Validate with an iterative (lo, hi)-bounded walk over kids:
        // strict bounds, no repeats, and every input node must have landed.
        let mut seen: HashSet<i32> = HashSet::new();
        let mut stack: Vec<(i32, i64, i64)> = vec![(root_val, i64::MIN, i64::MAX)];
        let mut ok = true;
        while let Some((v, lo, hi)) = stack.pop() {
            if !seen.insert(v) || !((v as i64) > lo && (v as i64) < hi) {
                ok = false;
                break;
            }
            let (l, r) = kids[&v];
            if let Some(lv) = l {
                stack.push((lv, lo, v as i64));
            }
            if let Some(rv) = r {
                stack.push((rv, v as i64, hi));
            }
        }
        if !ok || seen.len() != recs.len() || seen.len() != kids.len() {
            return None;
        }

        // Materialize owned shells from the validated live map.
        fn mk(val: i32, kids: &HashMap<i32, (Option<i32>, Option<i32>)>) -> Option<Box<TreeNode>> {
            let (l, r) = kids[&val];
            Some(Box::new(TreeNode {
                val,
                left: l.and_then(|lv| mk(lv, kids)),
                right: r.and_then(|rv| mk(rv, kids)),
            }))
        }
        mk(root_val, &kids)
    }
}
