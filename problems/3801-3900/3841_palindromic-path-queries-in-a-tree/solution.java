class Solution {

    public boolean[] palindromePath(int n, int[][] edges, String s, String[] queries) {
        // Adjacency as flat per-node arrays: two passes over the edge list.
        int[] degree = new int[n];
        for (int[] edge : edges) {
            degree[edge[0]]++;
            degree[edge[1]]++;
        }
        int[][] adjacency = new int[n][];
        for (int node = 0; node < n; node++) {
            adjacency[node] = new int[degree[node]];
        }
        int[] fill = new int[n];
        for (int[] edge : edges) {
            adjacency[edge[0]][fill[edge[0]]++] = edge[1];
            adjacency[edge[1]][fill[edge[1]]++] = edge[0];
        }

        // One iterative depth-first search from node 0 fills every static
        // structure: depth, entry/exit stamps tin/tout over 2n tick
        // positions, and the Euler walk (node on entry and after every
        // child) that the sparse table compresses. The explicit stack keeps
        // a 10^4-deep path off the call stack.
        int[] depth = new int[n];
        int[] tin = new int[n];
        int[] tout = new int[n];
        int[] first = new int[n];
        int[] walk = new int[2 * n - 1];
        int[] cursor = new int[n];
        boolean[] seen = new boolean[n];
        int clock = 0;
        int walkLength = 0;
        int[] stack = new int[n];
        int top = 0;
        seen[0] = true;
        tin[0] = clock++;
        first[0] = walkLength;
        walk[walkLength++] = 0;
        stack[top++] = 0;
        while (top > 0) {
            int node = stack[top - 1];
            if (cursor[node] < adjacency[node].length) {
                int child = adjacency[node][cursor[node]++];
                if (!seen[child]) {
                    seen[child] = true;
                    depth[child] = depth[node] + 1;
                    tin[child] = clock++;
                    first[child] = walkLength;
                    walk[walkLength++] = child;
                    stack[top++] = child;
                }
            } else {
                top--;
                tout[node] = clock++;
                if (top > 0) {
                    walk[walkLength++] = stack[top - 1];
                }
            }
        }

        // Only letter parities matter, so each node carries a 26-bit mask
        // and path masks combine by XOR. The path mask of u..v is
        // rootMask(u) ^ rootMask(v) ^ letter(lca): the common ancestors
        // cancel between the two root paths, so the LCA's letter returns.
        // rootMask(x) is the XOR of every delta whose node is an
        // ancestor-or-equal of x; on tick positions those are exactly the
        // intervals [tin, tout] containing tin[x], so flipping each delta
        // at tin and tout + 2 makes rootMask(x) a prefix XOR read at
        // tin[x] + 1 — non-ancestor subtrees contribute both flips and
        // cancel. A Fenwick tree over the 2n positions serves reads/flips.
        int size = 2 * n;
        char[] letters = s.toCharArray();
        int[] deltaAt = new int[size + 1];
        for (int node = 0; node < n; node++) {
            int bit = 1 << (letters[node] - 'a');
            deltaAt[tin[node] + 1] ^= bit;
            int closing = tout[node] + 2;
            if (closing <= size) {
                deltaAt[closing] ^= bit;
            }
        }
        int[] tree = new int[size + 1];
        int[] prefix = new int[size + 1];
        int running = 0;
        for (int position = 1; position <= size; position++) {
            running ^= deltaAt[position];
            prefix[position] = running;
        }
        for (int position = 1; position <= size; position++) {
            int low = position & -position;
            tree[position] = prefix[position] ^ prefix[position - low];
        }

        // Sparse table over the Euler walk: packing (depth << 17) | node
        // makes a plain long minimum return the shallowest node of any
        // walk range, which is the LCA. depth and node stay under 2^17,
        // but the packed key passes 2^32, hence the 64-bit widening.
        int levels = 1;
        while (1 << levels <= walkLength) {
            levels++;
        }
        long[][] table = new long[levels][];
        table[0] = new long[walkLength];
        for (int index = 0; index < walkLength; index++) {
            table[0][index] = ((long) depth[walk[index]] << 17) | walk[index];
        }
        for (int level = 1; level < levels; level++) {
            int half = 1 << (level - 1);
            long[] previous = table[level - 1];
            int length = walkLength - (1 << level) + 1;
            long[] current = new long[length];
            for (int index = 0; index < length; index++) {
                long a = previous[index];
                long b = previous[index + half];
                current[index] = a <= b ? a : b;
            }
            table[level] = current;
        }
        int[] log2 = new int[walkLength + 1];
        for (int index = 2; index <= walkLength; index++) {
            log2[index] = log2[index >> 1] + 1;
        }

        int answerCount = 0;
        for (String query : queries) {
            if (query.charAt(0) == 'q') {
                answerCount++;
            }
        }
        boolean[] answer = new boolean[answerCount];
        int out = 0;
        for (String query : queries) {
            int space1 = query.indexOf(' ');
            int space2 = query.indexOf(' ', space1 + 1);
            if (query.charAt(0) == 'u') {
                int node = Integer.parseInt(query, space1 + 1, space2, 10);
                char letter = query.charAt(space2 + 1);
                int delta = (1 << (letters[node] - 'a')) ^ (1 << (letter - 'a'));
                if (delta != 0) {
                    letters[node] = letter;
                    for (int position = tin[node] + 1; position <= size; position += position & -position) {
                        tree[position] ^= delta;
                    }
                    int closing = tout[node] + 2;
                    if (closing <= size) {
                        for (int position = closing; position <= size; position += position & -position) {
                            tree[position] ^= delta;
                        }
                    }
                }
            } else {
                int u = Integer.parseInt(query, space1 + 1, space2, 10);
                int v = Integer.parseInt(query, space2 + 1, query.length(), 10);
                int left = first[u];
                int right = first[v];
                if (left > right) {
                    int swap = left;
                    left = right;
                    right = swap;
                }
                int power = log2[right - left + 1];
                long best = table[power][left];
                long other = table[power][right - (1 << power) + 1];
                if (other < best) {
                    best = other;
                }
                int topNode = (int) (best & 131071);
                int mask = 0;
                for (int position = tin[u] + 1; position > 0; position -= position & -position) {
                    mask ^= tree[position];
                }
                for (int position = tin[v] + 1; position > 0; position -= position & -position) {
                    mask ^= tree[position];
                }
                mask ^= 1 << (letters[topNode] - 'a');
                // At most one set bit <=> the mask is 0 or a power of two.
                answer[out++] = mask == 0 || (mask & (mask - 1)) == 0;
            }
        }
        return answer;
    }
}
