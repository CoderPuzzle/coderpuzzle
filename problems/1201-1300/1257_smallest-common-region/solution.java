class Solution {

    public String findSmallestRegion(java.util.List<java.util.List<String>> regions, String region1, String region2) {
        java.util.Map<String, String> parent = new java.util.HashMap<>();
        for (java.util.List<String> group : regions) {
            for (int i = 1; i < group.size(); ++i) {
                parent.put(group.get(i), group.get(0));
            }
        }
        // Ancestor chain of region1, itself included.
        java.util.Set<String> chain = new java.util.HashSet<>();
        String node = region1;
        while (true) {
            chain.add(node);
            String up = parent.get(node);
            if (up == null) break;
            node = up;
        }
        // First ancestor of region2 inside that chain is the LCA.
        node = region2;
        while (!chain.contains(node)) {
            node = parent.get(node);
        }
        return node;
    }
}
