#include <algorithm>
#include <vector>

using namespace std;

class Solution {
  public:
    int minLights(vector<int> &lights) {
        int n = (int)lights.size();
        vector<int> diff(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            if (lights[i] == 0)
                continue;
            int left = max(0, i - lights[i]);
            int right = min(n - 1, i + lights[i]);
            ++diff[left];
            --diff[right + 1];
        }
        vector<bool> covered(n, false);
        int current = 0;
        for (int i = 0; i < n; ++i) {
            current += diff[i];
            covered[i] = current > 0;
        }

        int answer = 0;
        for (int i = 0; i < n; ++i) {
            if (!covered[i]) {
                ++answer;
                int end = min(n - 1, i + 2);
                for (int j = i; j <= end; ++j)
                    covered[j] = true;
                i = end;
            }
        }
        return answer;
    }
};
