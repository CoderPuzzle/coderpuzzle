#include <utility>
#include <vector>

class SparseVector {
    // A sparse vector keeps only its nonzero (index, value) pairs — the
    // indices arrive in increasing order by construction — so a vector of
    // length 1e5 with three nonzero entries stores three pairs. The dot
    // product then merges the two sorted pair lists with two cursors:
    // equal indices contribute one product and advance both cursors, a
    // smaller index advances alone because its partner there is zero. The
    // bound 1e5 * 100 * 100 = 1e9 still fits an int.
  public:
    SparseVector(std::vector<int> &nums) {
        for (int index = 0; index < (int)nums.size(); index++) {
            if (nums[index] != 0) {
                pairs.push_back({index, nums[index]});
            }
        }
    }

    // Return the dotProduct of two sparse vectors
    int dotProduct(SparseVector &vec) {
        int total = 0;
        std::size_t left = 0;
        std::size_t right = 0;
        while (left < pairs.size() && right < vec.pairs.size()) {
            if (pairs[left].first == vec.pairs[right].first) {
                total += pairs[left].second * vec.pairs[right].second;
                left++;
                right++;
            } else if (pairs[left].first < vec.pairs[right].first) {
                left++;
            } else {
                right++;
            }
        }
        return total;
    }

  private:
    std::vector<std::pair<int, int>> pairs;
};
