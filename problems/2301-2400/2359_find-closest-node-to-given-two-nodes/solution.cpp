#include <vector>

using namespace std;

class Solution {
  public:
    // One outgoing edge per node means the walk is forced; a node already
    // seen marks the cycle, so stop there. -1 doubles as the INF marker.
    vector<int> distances(const vector<int> &edges, int start) {
        vector<int> distance(edges.size(), -1);
        int current = start;
        for (int steps = 0; current != -1 && distance[current] == -1; ++steps) {
            distance[current] = steps;
            current = edges[current];
        }
        return distance;
    }

  public:
    int closestMeetingNode(vector<int> &edges, int node1, int node2) {
        vector<int> from1 = distances(edges, node1);
        vector<int> from2 = distances(edges, node2);
        int best_node = -1;
        int best_max = -1;                                   // only meaningful once best_node != -1
        for (size_t node = 0; node < edges.size(); ++node) { // ascending: ties keep the smaller
            if (from1[node] == -1 || from2[node] == -1) {
                continue;
            }
            int reach_max = max(from1[node], from2[node]);
            if (best_node == -1 || reach_max < best_max) {
                best_node = static_cast<int>(node);
                best_max = reach_max;
            }
        }
        return best_node;
    }
};
