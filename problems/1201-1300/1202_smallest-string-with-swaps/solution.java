class Solution {

    public String smallestStringWithSwaps(String s, int[][] pairs) {
        int n = s.length();
        int[] parent = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;

        // chained swaps let any two indices in one component exchange, so a
        // component's character multiset is fixed but freely permutable
        for (int[] pair : pairs) {
            int ra = find(parent, pair[0]);
            int rb = find(parent, pair[1]);
            if (ra != rb) parent[ra] = rb;
        }

        java.util.Map<Integer, java.util.List<Integer>> groups = new java.util.HashMap<>();
        for (int i = 0; i < n; i++) {
            int root = find(parent, i);
            groups.computeIfAbsent(root, r -> new java.util.ArrayList<>()).add(i);
        }

        char[] result = s.toCharArray();
        // smallest characters to the smallest indices of each component;
        // components are independent so this is globally optimal
        for (java.util.List<Integer> indices : groups.values()) {
            java.util.Collections.sort(indices);
            char[] chars = new char[indices.size()];
            for (int i = 0; i < indices.size(); i++) {
                chars[i] = result[indices.get(i)];
            }
            java.util.Arrays.sort(chars);
            for (int i = 0; i < indices.size(); i++) {
                result[indices.get(i)] = chars[i];
            }
        }
        return new String(result);
    }

    private int find(int[] parent, int x) {
        // path halving keeps the trees shallow
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
}
