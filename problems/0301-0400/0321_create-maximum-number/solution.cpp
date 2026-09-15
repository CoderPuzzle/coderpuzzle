#include <vector>

class Solution {
  public:
    vector<int> maxNumber(vector<int> &nums1, vector<int> &nums2, int k) {
        vector<int> best;
        // Try every split of the k digits between the two arrays and keep the
        // best merged candidate; the answer is the max over all splits.
        for (int take1 = 0; take1 <= (int)nums1.size(); ++take1) {
            int take2 = k - take1;
            if (take2 < 0 || take2 > (int)nums2.size())
                continue;
            vector<int> candidate = merge(maxSubsequence(nums1, take1), maxSubsequence(nums2, take2));
            // vector comparison is lexicographic, exactly the digit order.
            if (candidate > best)
                best = candidate;
        }
        return best;
    }

  private:
    vector<int> maxSubsequence(const vector<int> &nums, int t) {
        // Monotonic stack: while digits can still be dropped, pop any smaller
        // digit in front of a larger newcomer, then keep the first t digits.
        vector<int> stack;
        stack.reserve(nums.size());
        int drop = (int)nums.size() - t;
        for (int num : nums) {
            while (drop > 0 && !stack.empty() && stack.back() < num) {
                stack.pop_back();
                drop--;
            }
            stack.push_back(num);
        }
        stack.resize(t);
        return stack;
    }

    vector<int> merge(const vector<int> &a, const vector<int> &b) {
        vector<int> merged;
        merged.reserve(a.size() + b.size());
        size_t i = 0, j = 0;
        while (i < a.size() && j < b.size()) {
            // Equal heads are decided by comparing the tails that follow.
            if (greater(a, i, b, j))
                merged.push_back(a[i++]);
            else
                merged.push_back(b[j++]);
        }
        while (i < a.size())
            merged.push_back(a[i++]);
        while (j < b.size())
            merged.push_back(b[j++]);
        return merged;
    }

    bool greater(const vector<int> &a, size_t i, const vector<int> &b, size_t j) {
        // Is a[i:] the larger remaining sequence? Skip the equal prefix first;
        // whichever tail runs out (or holds the smaller digit) loses the tie.
        while (i < a.size() && j < b.size() && a[i] == b[j]) {
            i++;
            j++;
        }
        return j == b.size() || (i < a.size() && a[i] > b[j]);
    }
};
