use std::collections::HashMap;

impl Solution {
    pub fn tree_queries(root: Option<Box<TreeNode>>, queries: Vec<i32>) -> Vec<i32> {
        let mut depth: HashMap<i32, i32> = HashMap::new();
        let mut height: HashMap<i32, i32> = HashMap::new();
        let mut submax: HashMap<i32, i32> = HashMap::new();
        let mut lkid: HashMap<i32, i32> = HashMap::new();
        let mut rkid: HashMap<i32, i32> = HashMap::new();
        let mut order: Vec<i32> = Vec::new();

        // iterative pre-order for depth (values are distinct)
        let mut stack: Vec<(Option<Box<TreeNode>>, i32)> = vec![(root, 0)];
        while let Some((node, d)) = stack.pop() {
            if let Some(b) = node {
                let mut b = *b;
                depth.insert(b.val, d);
                order.push(b.val);
                let l = b.left.take();
                let r = b.right.take();
                if let Some(ref lb) = l {
                    lkid.insert(b.val, lb.val);
                }
                if let Some(ref rb) = r {
                    rkid.insert(b.val, rb.val);
                }
                stack.push((l, d + 1));
                stack.push((r, d + 1));
            }
        }
        if order.is_empty() {
            return vec![0; queries.len()];
        }

        // post-order (reverse pre-order) for height/submax
        for &v in order.iter().rev() {
            let dv = depth[&v];
            let mut h = 0;
            if let Some(&lv) = lkid.get(&v) {
                h = h.max(1 + height[&lv]);
            }
            if let Some(&rv) = rkid.get(&v) {
                h = h.max(1 + height[&rv]);
            }
            height.insert(v, h);
            let mut sm = dv + h;
            if let Some(&lv) = lkid.get(&v) {
                sm = sm.max(submax[&lv]);
            }
            if let Some(&rv) = rkid.get(&v) {
                sm = sm.max(submax[&rv]);
            }
            submax.insert(v, sm);
        }

        let mut ans: HashMap<i32, i32> = HashMap::new();
        let root_val = order[0];
        let mut st: Vec<(i32, i32)> = vec![(root_val, -1)];
        while let Some((v, mx)) = st.pop() {
            ans.insert(v, mx);
            let lv = lkid.get(&v).copied();
            let rv = rkid.get(&v).copied();
            let dv = depth[&v];
            if let Some(l) = lv {
                let h_without_left = rv.map(|r| 1 + height[&r]).unwrap_or(0);
                let mut new_mx = mx;
                if dv + h_without_left > new_mx {
                    new_mx = dv + h_without_left;
                }
                if let Some(r) = rv {
                    if submax[&r] > new_mx {
                        new_mx = submax[&r];
                    }
                }
                st.push((l, new_mx));
            }
            if let Some(r) = rv {
                let h_without_right = lv.map(|l| 1 + height[&l]).unwrap_or(0);
                let mut new_mx = mx;
                if dv + h_without_right > new_mx {
                    new_mx = dv + h_without_right;
                }
                if let Some(l) = lv {
                    if submax[&l] > new_mx {
                        new_mx = submax[&l];
                    }
                }
                st.push((r, new_mx));
            }
        }

        queries.iter().map(|q| ans[q]).collect()
    }
}
