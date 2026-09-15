class Solution {

    public boolean[] friendRequests(int n, int[][] restrictions, int[][] requests) {
        int[] parent = new int[n];
        int[] size = new int[n];
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            size[i] = 1;
        }

        boolean[] answer = new boolean[requests.length];
        for (int i = 0; i < requests.length; i++) {
            int rootU = find(parent, requests[i][0]);
            int rootV = find(parent, requests[i][1]);
            boolean allowed = true;
            for (int[] restriction : restrictions) {
                int rootX = find(parent, restriction[0]);
                int rootY = find(parent, restriction[1]);
                if ((rootX == rootU && rootY == rootV) || (rootX == rootV && rootY == rootU)) {
                    allowed = false;
                    break;
                }
            }

            answer[i] = allowed;
            if (allowed && rootU != rootV) {
                if (size[rootU] < size[rootV]) {
                    int temporary = rootU;
                    rootU = rootV;
                    rootV = temporary;
                }
                parent[rootV] = rootU;
                size[rootU] += size[rootV];
            }
        }
        return answer;
    }

    private int find(int[] parent, int node) {
        while (parent[node] != node) {
            parent[node] = parent[parent[node]];
            node = parent[node];
        }
        return node;
    }
}
