class Solution {
  public:
    int numTriplets(vector<int> &nums1, vector<int> &nums2) {
        long long total = countType(nums1, nums2) + countType(nums2, nums1);
        return (int)total;
    }

  private:
    // Counts index pairs (j, k), j < k, in b whose product equals some
    // a[i]^2, summed over every i in a.
    long long countType(vector<int> &a, vector<int> &b) {
        unordered_map<long long, long long> freq;
        for (int v : b) {
            ++freq[v];
        }
        vector<long long> distinct;
        distinct.reserve(freq.size());
        for (auto &entry : freq) {
            distinct.push_back(entry.first);
        }
        sort(distinct.begin(), distinct.end());

        long long total = 0;
        for (int x : a) {
            // Squares reach up to (1e5)^2 = 1e10, outside 32-bit range.
            long long target = (long long)x * x;
            for (long long v : distinct) {
                if (v * v > target) {
                    break;
                }
                if (target % v != 0) {
                    continue;
                }
                long long other = target / v;
                if (other == v) {
                    long long c = freq[v];
                    total += c * (c - 1) / 2;
                } else {
                    auto it = freq.find(other);
                    if (it != freq.end()) {
                        total += freq[v] * it->second;
                    }
                }
            }
        }
        return total;
    }
};
