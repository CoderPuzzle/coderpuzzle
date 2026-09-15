#include <vector>

class Solution {
  public:
    int evenSumSubgraphs(vector<int> &nums, vector<vector<int>> &edges) {
        vector<int> adjacency(nums.size(), 0);
        for (const vector<int> &edge : edges) {
            adjacency[edge[0]] |= 1 << edge[1];
            adjacency[edge[1]] |= 1 << edge[0];
        }

        int answer = 0;
        for (int mask = 1; mask < (1 << nums.size()); ++mask) {
            int parity = 0;
            int bits = mask;
            while (bits) {
                int bit = bits & -bits;
                parity ^= nums[__builtin_ctz(bit)];
                bits ^= bit;
            }
            if (parity)
                continue;

            int reached = mask & -mask;
            int frontier = reached;
            while (frontier) {
                int neighbors = 0;
                bits = frontier;
                while (bits) {
                    int bit = bits & -bits;
                    neighbors |= adjacency[__builtin_ctz(bit)];
                    bits ^= bit;
                }
                frontier = neighbors & mask & ~reached;
                reached |= frontier;
            }
            if (reached == mask)
                ++answer;
        }
        return answer;
    }
};
