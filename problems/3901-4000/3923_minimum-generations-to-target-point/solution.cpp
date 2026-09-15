#include <algorithm>
#include <vector>

using namespace std;

class Solution {
  public:
    int minGenerations(vector<vector<int>> &points, vector<int> &target) {
        const int size = 7;
        const int total = size * size * size;
        const int INF = 1e9;
        vector<int> best(total, INF);
        for (auto &point : points)
            best[index(point[0], point[1], point[2], size)] = 0;

        bool changed = true;
        while (changed) {
            changed = false;
            for (int a = 0; a < total; ++a) {
                if (best[a] == INF)
                    continue;
                int ax = a / (size * size);
                int ay = (a / size) % size;
                int az = a % size;
                for (int b = a + 1; b < total; ++b) {
                    if (best[b] == INF)
                        continue;
                    int bx = b / (size * size);
                    int by = (b / size) % size;
                    int bz = b % size;
                    int nx = (ax + bx) / 2;
                    int ny = (ay + by) / 2;
                    int nz = (az + bz) / 2;
                    int next = index(nx, ny, nz, size);
                    int candidate = max(best[a], best[b]) + 1;
                    if (candidate < best[next]) {
                        best[next] = candidate;
                        changed = true;
                    }
                }
            }
        }

        int answer = best[index(target[0], target[1], target[2], size)];
        return answer == INF ? -1 : answer;
    }

  private:
    int index(int x, int y, int z, int size) { return x * size * size + y * size + z; }
};
