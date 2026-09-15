#include <vector>

class Solution {
  public:
    int edgeScore(vector<int> &edges) {
        // Node edges[i] gains i to its score, so one accumulation pass fills
        // every score; a second pass picks the highest with the smallest
        // index (strict > keeps the earlier node on ties). Scores reach
        // ~n^2/2 = 5e9, so accumulate in 64 bits.
        std::vector<long long> scores(edges.size(), 0);
        for (int source = 0; source < static_cast<int>(edges.size()); ++source) {
            scores[edges[source]] += source;
        }
        int best_node = 0;
        for (int node = 1; node < static_cast<int>(scores.size()); ++node) {
            if (scores[node] > scores[best_node]) {
                best_node = node;
            }
        }
        return best_node;
    }
};
