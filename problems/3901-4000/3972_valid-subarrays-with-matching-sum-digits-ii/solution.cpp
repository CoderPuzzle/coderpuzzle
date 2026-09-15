#include <vector>

using namespace std;

class Solution {
  public:
    long long countValidSubarrays(vector<int> &nums, int x) {
        int n = (int)nums.size();
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; ++i)
            prefix[i + 1] = prefix[i] + nums[i];

        long long answer = 0;
        // Window p covers sums whose first digit is x: [x*10^p, (x+1)*10^p-1].
        long long scale = 1;
        for (int w = 0; w < 16; ++w) {
            long long lo = x * scale;
            long long hi = (x + 1) * scale - 1;
            scale *= 10;
            if (lo > prefix[n])
                break;
            int left = 0;
            int entered = 0; // prefix indices [left, entered) are inside the window
            vector<long long> residue(10, 0);
            for (int j = 1; j <= n; ++j) {
                long long floor = prefix[j] - hi;
                long long ceiling = prefix[j] - lo;
                while (entered < j && prefix[entered] <= ceiling) {
                    residue[prefix[entered] % 10]++;
                    ++entered;
                }
                while (prefix[left] < floor) {
                    residue[prefix[left] % 10]--;
                    ++left;
                }
                answer += residue[((prefix[j] - x) % 10 + 10) % 10];
            }
        }
        return answer;
    }
};
