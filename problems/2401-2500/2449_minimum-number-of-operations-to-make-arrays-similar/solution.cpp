#include <algorithm>
#include <vector>

class Solution {
  public:
    long long makeSimilar(vector<int> &nums, vector<int> &target) {
        // Every move is +-2, so an element's parity never changes and the
        // even/odd classes evolve independently in size. Within a class,
        // matching sorted positions smallest-to-smallest (hints 2-3) never
        // wastes work: any crossing assignment can be uncrossed without
        // raising the total rise. Each operation supplies exactly one +2,
        // so the answer is the total positive rise divided by 2 — the
        // drops are free riders on the same operations.
        vector<int> evens = paritySorted(nums, 0);
        vector<int> odds = paritySorted(nums, 1);
        vector<int> tevens = paritySorted(target, 0);
        vector<int> todds = paritySorted(target, 1);
        long long ops = 0;
        for (size_t i = 0; i < evens.size(); i++) {
            if (tevens[i] > evens[i]) {
                ops += (long long)(tevens[i] - evens[i]) / 2;
            }
        }
        for (size_t i = 0; i < odds.size(); i++) {
            if (todds[i] > odds[i]) {
                ops += (long long)(todds[i] - odds[i]) / 2;
            }
        }
        return ops;
    }

  private:
    static vector<int> paritySorted(const vector<int> &arr, int parity) {
        vector<int> out;
        for (int x : arr) {
            if (x % 2 == parity) {
                out.push_back(x);
            }
        }
        sort(out.begin(), out.end());
        return out;
    }
};
