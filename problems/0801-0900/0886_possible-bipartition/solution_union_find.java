import java.util.*;

class Solution {

    public boolean possibleBipartition(int n, int[][] dislikes) {
        // Dislike is symmetric, so build an undirected adjacency list: the
        // unions below need, for every person, everyone that person avoids.
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            adjacency.add(new ArrayList<>());
        }
        for (int[] d : dislikes) {
            adjacency.get(d[0]).add(d[1]);
            adjacency.get(d[1]).add(d[0]);
        }

        int[] parent = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            parent[i] = i;
        }

        // Everyone a person dislikes must land in one set (the opposite
        // group), so union them all onto that person's first enemy.
        for (int person = 1; person <= n; person++) {
            List<Integer> avoided = adjacency.get(person);
            for (int i = 1; i < avoided.size(); i++) {
                int ra = find(parent, avoided.get(0));
                int rb = find(parent, avoided.get(i));
                if (ra != rb) {
                    parent[ra] = rb;
                }
            }
        }

        // The split works exactly when no dislike pair ended up merged.
        for (int[] d : dislikes) {
            if (find(parent, d[0]) == find(parent, d[1])) {
                return false;
            }
        }
        return true;
    }

    // Path-halving: splice every other node directly under its
    // grandparent, flattening the tree while walking to the root.
    private int find(int[] parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}
