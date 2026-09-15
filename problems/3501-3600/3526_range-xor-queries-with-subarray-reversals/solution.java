class Solution {

    private static class Node {

        int val;
        int prio;
        int size, xor;
        boolean rev;
        Node l, r;
    }

    private Node[] pool;
    private int poolTop;
    private long seed = 123456789L;

    private int nextPrio() {
        seed = (seed * 1103515245L + 12345L) & 0x7fffffffL;
        return (int) seed;
    }

    private Node make(int val) {
        Node t = new Node();
        t.val = val;
        t.prio = nextPrio();
        t.size = 1;
        t.xor = val;
        t.rev = false;
        t.l = t.r = null;
        return t;
    }

    private static int sz(Node t) {
        return t == null ? 0 : t.size;
    }

    private static int xr(Node t) {
        return t == null ? 0 : t.xor;
    }

    private void push(Node t) {
        if (t != null && t.rev) {
            t.rev = false;
            Node tmp = t.l;
            t.l = t.r;
            t.r = tmp;
            if (t.l != null) t.l.rev = !t.l.rev;
            if (t.r != null) t.r.rev = !t.r.rev;
        }
    }

    private void pull(Node t) {
        if (t != null) {
            t.size = 1 + sz(t.l) + sz(t.r);
            t.xor = t.val ^ xr(t.l) ^ xr(t.r);
        }
    }

    private Node merge(Node a, Node b) {
        if (a == null) return b;
        if (b == null) return a;
        push(a);
        push(b);
        if (a.prio < b.prio) {
            a.r = merge(a.r, b);
            pull(a);
            return a;
        }
        b.l = merge(a, b.l);
        pull(b);
        return b;
    }

    // Split into (first k nodes, the rest).
    private Node[] split(Node t, int k) {
        if (t == null) return new Node[] { null, null };
        push(t);
        int left = sz(t.l);
        if (k <= left) {
            Node[] ab = split(t.l, k);
            t.l = ab[1];
            pull(t);
            return new Node[] { ab[0], t };
        }
        Node[] ab = split(t.r, k - left - 1);
        t.r = ab[0];
        pull(t);
        return new Node[] { t, ab[1] };
    }

    public int[] getResults(int[] nums, int[][] queries) {
        Node root = null;
        for (int value : nums) root = merge(root, make(value));

        int[] out = new int[queries.length];
        int m = 0;
        for (int[] q : queries) {
            int typ = q[0];
            if (typ == 1) {
                int index = q[1],
                    value = q[2];
                Node[] s1 = split(root, index);
                Node[] s2 = split(s1[1], 1);
                Node mid = s2[0];
                mid.val = value;
                mid.xor = value;
                root = merge(s1[0], merge(mid, s2[1]));
            } else if (typ == 2) {
                int l = q[1],
                    r = q[2];
                Node[] s1 = split(root, l);
                Node[] s2 = split(s1[1], r - l + 1);
                out[m++] = xr(s2[0]);
                root = merge(s1[0], merge(s2[0], s2[1]));
            } else {
                int l = q[1],
                    r = q[2];
                Node[] s1 = split(root, l);
                Node[] s2 = split(s1[1], r - l + 1);
                s2[0].rev = !s2[0].rev;
                root = merge(s1[0], merge(s2[0], s2[1]));
            }
        }
        int[] res = new int[m];
        System.arraycopy(out, 0, res, 0, m);
        return res;
    }
}
