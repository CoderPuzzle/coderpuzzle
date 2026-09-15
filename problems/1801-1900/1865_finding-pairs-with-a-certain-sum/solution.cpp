#include <unordered_map>
#include <vector>

class FindSumPairs {
    // nums2 changes but nums1 never does, so keep a frequency map of nums2
    // and scan the short nums1 on every count: for each a in nums1 add
    // freq2[tot - a]. An add updates one array slot plus its two frequency
    // entries. The pair count can reach |nums1| * |nums2| = 1e8, hence long
    // long.
  public:
    FindSumPairs(std::vector<int> &nums1, std::vector<int> &nums2) : nums1(nums1), nums2(nums2) {
        for (int v : nums2) {
            freq2[v]++;
        }
    }

    void add(int index, int val) {
        int old = nums2[index];
        freq2[old]--;
        nums2[index] = old + val;
        freq2[nums2[index]]++;
    }

    long long count(int tot) {
        long long total = 0;
        for (int a : nums1) {
            auto it = freq2.find(tot - a);
            if (it != freq2.end()) {
                total += it->second;
            }
        }
        return total;
    }

  private:
    std::vector<int> nums1;
    std::vector<int> nums2;
    std::unordered_map<int, long long> freq2;
};
