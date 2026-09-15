import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] processQueries(int c, int[][] connections, int[][] queries) {
        // Union-Find assigns every station its fixed grid; an offline
        // station stays in its grid, so connectivity never changes.
        int[] parent = new int[c + 1];
        int[] size = new int[c + 1];
        for (int i = 1; i <= c; ++i) {
            parent[i] = i;
            size[i] = 1;
        }
        for (int[] e : connections) union(parent, size, e[0], e[1]);

        // Group stations by component root, each group sorted ascending.
        Map<Integer, List<Integer>> groups = new HashMap<>();
        for (int x = 1; x <= c; ++x) {
            int r = find(parent, x);
            groups.computeIfAbsent(r, k -> new ArrayList<>()).add(x);
        }
        List<int[]> components = new ArrayList<>();
        int[] compOf = new int[c + 1];
        int index = 0;
        for (List<Integer> members : groups.values()) {
            int[] arr = members.stream().mapToInt(Integer::intValue).toArray();
            Arrays.sort(arr);
            for (int m : arr) compOf[m] = index;
            components.add(arr);
            ++index;
        }

        boolean[] online = new boolean[c + 1];
        Arrays.fill(online, true);
        // ptr[i] is the smallest index into components[i] that is still
        // online; stations only go offline, so it moves monotonically and
        // each advance happens at most once per station.
        int[] ptr = new int[components.size()];

        int[] answer = new int[queries.length];
        int wrote = 0;
        for (int[] q : queries) {
            int x = q[1];
            if (q[0] == 1) {
                if (online[x]) {
                    // An online station resolves the check by itself, even
                    // if a smaller station in the same grid is online.
                    answer[wrote++] = x;
                } else {
                    int[] members = components.get(compOf[x]);
                    int p = ptr[compOf[x]];
                    answer[wrote++] = p < members.length ? members[p] : -1;
                }
            } else if (online[x]) {
                online[x] = false;
                int ci = compOf[x];
                int[] members = components.get(ci);
                // Only a hit on the current minimum forces the pointer on.
                if (members[ptr[ci]] == x) {
                    int p = ptr[ci];
                    while (p < members.length && !online[members[p]]) ++p;
                    ptr[ci] = p;
                }
            }
        }
        return Arrays.copyOf(answer, wrote);
    }

    private int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    private void union(int[] parent, int[] size, int a, int b) {
        int ra = find(parent, a);
        int rb = find(parent, b);
        if (ra == rb) return;
        if (size[ra] < size[rb]) {
            int t = ra;
            ra = rb;
            rb = t;
        }
        parent[rb] = ra;
        size[ra] += size[rb];
    }
}
