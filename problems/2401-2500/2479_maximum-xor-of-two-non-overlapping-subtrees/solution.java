import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public long maxXor(int n, int[][] edges, int[] values) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }
        for (int[] e : edges) {
            graph.get(e[0]).add(e[1]);
            graph.get(e[1]).add(e[0]);
        }

        // iterative DFS for order + parents
        int[] parent = new int[n];
        boolean[] visited = new boolean[n];
        int[] order = new int[n];
        int cnt = 0;
        visited[0] = true;
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        while (!stack.isEmpty()) {
            int u = stack.pop();
            order[cnt++] = u;
            for (int v : graph.get(u)) {
                if (!visited[v]) {
                    visited[v] = true;
                    parent[v] = u;
                    stack.push(v);
                }
            }
        }

        long[] sub = new long[n];
        for (int i = 0; i < n; i++) {
            sub[i] = values[i];
        }
        for (int i = cnt - 1; i >= 0; i--) {
            int u = order[i];
            int p = parent[u];
            if (p >= 0) {
                sub[p] += sub[u];
            }
        }

        long maxSum = 1;
        for (long x : sub) {
            if (x > maxSum) {
                maxSum = x;
            }
        }
        int bits = 64 - Long.numberOfLeadingZeros(maxSum);

        // flat trie: children[node] = {left, right}, -1 marks a missing child
        List<int[]> trie = new ArrayList<>();
        trie.add(new int[] { -1, -1 });

        long answer = query(trie, sub[0], bits);

        int[] ptr = new int[n];
        Deque<Integer> stk = new ArrayDeque<>();
        Deque<Integer> par = new ArrayDeque<>();
        stk.push(0);
        par.push(-1);
        while (!stk.isEmpty()) {
            int u = stk.peek();
            int p = par.peek();
            if (ptr[u] < graph.get(u).size()) {
                int v = graph.get(u).get(ptr[u]++);
                if (v != p) {
                    long best = query(trie, sub[v], bits);
                    if (best > answer) {
                        answer = best;
                    }
                    stk.push(v);
                    par.push(u);
                }
            } else {
                stk.pop();
                par.pop();
                insert(trie, sub[u], bits);
            }
        }
        return answer;
    }

    private void insert(List<int[]> trie, long value, int bits) {
        int node = 0;
        for (int b = bits - 1; b >= 0; b--) {
            int bit = (int) ((value >> b) & 1);
            int nxt = trie.get(node)[bit];
            if (nxt == -1) {
                nxt = trie.size();
                trie.add(new int[] { -1, -1 });
                trie.get(node)[bit] = nxt;
            }
            node = nxt;
        }
    }

    private long query(List<int[]> trie, long value, int bits) {
        int node = 0;
        long result = 0;
        for (int b = bits - 1; b >= 0; b--) {
            int bit = (int) ((value >> b) & 1);
            int want = 1 - bit;
            int[] kids = trie.get(node);
            if (kids[want] != -1) {
                result |= 1L << b;
                node = kids[want];
            } else {
                node = kids[bit];
            }
            if (node == -1) {
                return result;
            }
        }
        return result;
    }
}
