struct TNode {
    val: i32,
    prio: u32,
    size: i32,
    xr: i32,
    rev: bool,
    l: i32,
    r: i32,
}

impl Solution {
    fn sz(nodes: &[TNode], t: i32) -> i32 {
        if t < 0 {
            0
        } else {
            nodes[t as usize].size
        }
    }

    fn xr(nodes: &[TNode], t: i32) -> i32 {
        if t < 0 {
            0
        } else {
            nodes[t as usize].xr
        }
    }

    fn push(nodes: &mut [TNode], t: i32) {
        if t >= 0 && nodes[t as usize].rev {
            nodes[t as usize].rev = false;
            let (l, r) = (nodes[t as usize].l, nodes[t as usize].r);
            nodes[t as usize].l = r;
            nodes[t as usize].r = l;
            if l >= 0 {
                nodes[l as usize].rev = !nodes[l as usize].rev;
            }
            if r >= 0 {
                nodes[r as usize].rev = !nodes[r as usize].rev;
            }
        }
    }

    fn pull(nodes: &mut [TNode], t: i32) {
        if t >= 0 {
            let (l, r) = (nodes[t as usize].l, nodes[t as usize].r);
            nodes[t as usize].size = 1 + Self::sz(nodes, l) + Self::sz(nodes, r);
            let vl = Self::xr(nodes, l);
            let vr = Self::xr(nodes, r);
            let v = nodes[t as usize].val;
            nodes[t as usize].xr = v ^ vl ^ vr;
        }
    }

    fn merge(nodes: &mut [TNode], a: i32, b: i32) -> i32 {
        if a < 0 {
            return b;
        }
        if b < 0 {
            return a;
        }
        Self::push(nodes, a);
        Self::push(nodes, b);
        if nodes[a as usize].prio < nodes[b as usize].prio {
            let ar = nodes[a as usize].r;
            let nr = Self::merge(nodes, ar, b);
            nodes[a as usize].r = nr;
            Self::pull(nodes, a);
            a
        } else {
            let bl = nodes[b as usize].l;
            let nl = Self::merge(nodes, a, bl);
            nodes[b as usize].l = nl;
            Self::pull(nodes, b);
            b
        }
    }

    // split into (first k nodes, the rest)
    fn split(nodes: &mut [TNode], t: i32, k: i32) -> (i32, i32) {
        if t < 0 {
            return (-1, -1);
        }
        Self::push(nodes, t);
        let left = Self::sz(nodes, nodes[t as usize].l);
        if k <= left {
            let tl = nodes[t as usize].l;
            let (a, b) = Self::split(nodes, tl, k);
            nodes[t as usize].l = b;
            Self::pull(nodes, t);
            (a, t)
        } else {
            let tr = nodes[t as usize].r;
            let (a, b) = Self::split(nodes, tr, k - left - 1);
            nodes[t as usize].r = a;
            Self::pull(nodes, t);
            (t, b)
        }
    }

    pub fn get_results(nums: Vec<i32>, queries: Vec<Vec<i32>>) -> Vec<i32> {
        let mut nodes: Vec<TNode> = Vec::with_capacity(nums.len());
        let mut seed: u64 = 123456789;
        let mut root: i32 = -1;
        for &value in &nums {
            seed = (seed.wrapping_mul(1103515245).wrapping_add(12345)) & 0x7fff_ffff;
            nodes.push(TNode {
                val: value,
                prio: seed as u32,
                size: 1,
                xr: value,
                rev: false,
                l: -1,
                r: -1,
            });
            let idx = (nodes.len() - 1) as i32;
            root = Self::merge(&mut nodes, root, idx);
        }

        let mut out: Vec<i32> = Vec::new();
        for q in &queries {
            let typ = q[0];
            if typ == 1 {
                let (a, b) = Self::split(&mut nodes, root, q[1]);
                let (mid, c) = Self::split(&mut nodes, b, 1);
                nodes[mid as usize].val = q[2];
                nodes[mid as usize].xr = q[2];
                let mc = Self::merge(&mut nodes, mid, c);
                root = Self::merge(&mut nodes, a, mc);
            } else if typ == 2 {
                let (a, b) = Self::split(&mut nodes, root, q[1]);
                let (mid, c) = Self::split(&mut nodes, b, q[2] - q[1] + 1);
                out.push(nodes[mid as usize].xr);
                let mc = Self::merge(&mut nodes, mid, c);
                root = Self::merge(&mut nodes, a, mc);
            } else {
                let (a, b) = Self::split(&mut nodes, root, q[1]);
                let (mid, c) = Self::split(&mut nodes, b, q[2] - q[1] + 1);
                nodes[mid as usize].rev = !nodes[mid as usize].rev;
                let mc = Self::merge(&mut nodes, mid, c);
                root = Self::merge(&mut nodes, a, mc);
            }
        }
        out
    }
}
