#include <algorithm>
#include <queue>
#include <vector>

using namespace std;

class Solution {
  public:
    int minOperations(vector<int> &nums) {
        int n = (int)nums.size();
        int position = find(nums.begin(), nums.end(), 0) - nums.begin();
        int targetKind, targetShift;
        if (isRotationOfSorted(nums, position)) {
            targetKind = 0;
            targetShift = position;
        } else {
            vector<int> reversed(nums.rbegin(), nums.rend());
            int reversedPosition = find(reversed.begin(), reversed.end(), 0) - reversed.begin();
            if (!isRotationOfSorted(reversed, reversedPosition))
                return -1;
            targetKind = 1;
            targetShift = reversedPosition;
        }

        vector<vector<int>> distance(2, vector<int>(n, -1));
        queue<int> queue;
        distance[0][0] = 0;
        queue.push(0);
        while (!queue.empty()) {
            int state = queue.front();
            queue.pop();
            int kind = state / n;
            int shift = state % n;
            if (kind == targetKind && shift == targetShift)
                return distance[kind][shift];
            int neighbors[2][2] = {{kind, (shift + 1) % n}, {1 - kind, (n - shift) % n}};
            for (auto &neighbor : neighbors) {
                int nextKind = neighbor[0], nextShift = neighbor[1];
                if (distance[nextKind][nextShift] == -1) {
                    distance[nextKind][nextShift] = distance[kind][shift] + 1;
                    queue.push(nextKind * n + nextShift);
                }
            }
        }
        return -1;
    }

  private:
    bool isRotationOfSorted(vector<int> &values, int start) {
        int n = (int)values.size();
        for (int i = 0; i < n; ++i)
            if (values[(start + i) % n] != i)
                return false;
        return true;
    }
};
