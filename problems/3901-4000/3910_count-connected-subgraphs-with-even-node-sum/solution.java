class Solution {

    public int evenSumSubgraphs(int[] nums, int[][] edges) {
        int[] adjacency = new int[nums.length];
        for (int[] edge : edges) {
            adjacency[edge[0]] |= 1 << edge[1];
            adjacency[edge[1]] |= 1 << edge[0];
        }

        int answer = 0;
        for (int mask = 1; mask < 1 << nums.length; mask++) {
            int parity = 0;
            int bits = mask;
            while (bits != 0) {
                int bit = bits & -bits;
                parity ^= nums[Integer.numberOfTrailingZeros(bit)];
                bits ^= bit;
            }
            if (parity != 0) continue;

            int reached = mask & -mask;
            int frontier = reached;
            while (frontier != 0) {
                int neighbors = 0;
                bits = frontier;
                while (bits != 0) {
                    int bit = bits & -bits;
                    neighbors |= adjacency[Integer.numberOfTrailingZeros(bit)];
                    bits ^= bit;
                }
                frontier = neighbors & mask & ~reached;
                reached |= frontier;
            }
            if (reached == mask) answer++;
        }
        return answer;
    }
}
