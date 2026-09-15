class Solution {
  public:
    long long minCost(vector<int> &nums) {
        // Every operation removes two of the three frontmost elements, so
        // what remains is always an untouched suffix plus at most one
        // element left behind in front of it. Row j holds, at index c + 1,
        // the cheapest finish when nums[c] is that leftover (index 0 =
        // no leftover); computing row j reads only rows j + 2 and j + 3,
        // so a three-row ring bounds the table at O(n) memory. Costs sum
        // to at most 5 * 10^8, far inside long long range.
        int n = static_cast<int>(nums.size());
        if (n < 3) {
            return max(nums[0], nums[n - 1]);
        }

        vector<long long> rowN(n + 1, 0), rowNm1(n), rowNm2(n - 1);
        for (int c = 0; c < n; ++c) {
            rowN[c + 1] = nums[c];
        }
        rowNm1[0] = nums[n - 1];
        for (int c = 0; c < n - 1; ++c) {
            rowNm1[c + 1] = max(nums[c], nums[n - 1]);
        }
        rowNm2[0] = max(nums[n - 2], nums[n - 1]);
        for (int c = 0; c < n - 2; ++c) {
            long long a = nums[c], b = nums[n - 2], d = nums[n - 1];
            rowNm2[c + 1] = min(min(max(a, b) + d, max(a, d) + b), max(b, d) + a);
        }

        vector<vector<long long>> ring = {rowNm2, rowNm1, rowN};
        for (int j = n - 3; j >= 0; --j) {
            const vector<long long> &r2 = ring[1];
            const vector<long long> &r3 = ring[2];
            long long a = nums[j], b = nums[j + 1], d = nums[j + 2];
            long long pairCost = max(a, b);
            // No leftover: nums[j], nums[j+1], nums[j+2] meet one
            // operation and the survivor becomes the next leftover.
            vector<long long> row(j + 1);
            row[0] = min(min(max(b, d) + r3[j + 1], max(a, d) + r3[j + 2]), pairCost + r3[j + 3]);
            // With leftover nums[c]: the front three are nums[c], a, b.
            long long k1 = r2[j + 2], k2 = r2[j + 1];
            for (int c = 0; c < j; ++c) {
                long long v = nums[c];
                row[c + 1] = min(min(max(v, a) + k1, max(v, b) + k2), pairCost + r2[c + 1]);
            }
            ring[2] = ring[1];
            ring[1] = ring[0];
            ring[0] = move(row);
        }
        return ring[0][0];
    }
};
