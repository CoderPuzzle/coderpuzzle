#include <algorithm>
#include <climits>
#include <deque>
#include <utility>
#include <vector>

using namespace std;

class Solution {
  public:
    long long maximumSum(vector<int> &nums, int m, int l, int r) {
        int n = nums.size();
        vector<long long> prefix(n + 1);
        for (int i = 1; i <= n; ++i)
            prefix[i] = prefix[i - 1] + nums[i - 1];

        const long long impossible = LLONG_MIN / 4;
        vector<long long> previous(n + 1, 0);
        long long answer = impossible;

        for (int count = 1; count <= min(m, n / l); ++count) {
            vector<long long> current(n + 1, impossible);
            deque<pair<int, long long>> candidates;
            for (int end = 1; end <= n; ++end) {
                int start = end - l;
                if (start >= 0 && previous[start] != impossible) {
                    long long value = previous[start] - prefix[start];
                    while (!candidates.empty() && candidates.back().second <= value)
                        candidates.pop_back();
                    candidates.push_back({start, value});
                }

                int earliest = end - r;
                while (!candidates.empty() && candidates.front().first < earliest)
                    candidates.pop_front();

                current[end] = current[end - 1];
                if (!candidates.empty())
                    current[end] = max(current[end], prefix[end] + candidates.front().second);
            }
            answer = max(answer, current[n]);
            previous.swap(current);
        }
        return answer;
    }
};
