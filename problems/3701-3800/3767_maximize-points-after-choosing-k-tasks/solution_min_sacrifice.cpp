#include <algorithm>
#include <vector>

class Solution {
  public:
    long long maxPoints(vector<int> &technique1, vector<int> &technique2, int k) {
        // Start from the best-of-both baseline: each task pays its larger
        // value. Tasks where technique 1 already wins count toward the
        // quota for free; every task where technique 2 wins must pay back
        // its win (technique2[i] - technique1[i]) whenever the free count
        // falls short of k, and paying back the smallest losses first is
        // plainly optimal. No sort of the whole array is needed.
        long long base = 0;
        vector<long long> losses;
        int free = 0;
        for (size_t i = 0; i < technique1.size(); ++i) {
            if (technique1[i] >= technique2[i]) {
                base += technique1[i];
                ++free;
            } else {
                base += technique2[i];
                losses.push_back((long long)technique2[i] - technique1[i]);
            }
        }
        int forced = k - free;
        if (forced > 0) {
            sort(losses.begin(), losses.end());
            for (int i = 0; i < forced; ++i) {
                base -= losses[i];
            }
        }
        return base;
    }
};
