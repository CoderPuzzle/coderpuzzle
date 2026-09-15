class Solution {
  public:
    int countSubranges(vector<int> &nums1, vector<int> &nums2) {
        const int mod = 1000000007;
        const int offset = 10000;
        const int size = 20001;
        vector<int> previous(size);
        long long answer = 0;
        for (int index = 0; index < static_cast<int>(nums1.size()); ++index) {
            vector<int> current(size);
            current[offset + nums1[index]] = 1;
            current[offset - nums2[index]] = (current[offset - nums2[index]] + 1) % mod;
            for (int position = 0; position < size; ++position) {
                if (previous[position] == 0) {
                    continue;
                }
                if (position + nums1[index] < size) {
                    current[position + nums1[index]] = (current[position + nums1[index]] + previous[position]) % mod;
                }
                if (position - nums2[index] >= 0) {
                    current[position - nums2[index]] = (current[position - nums2[index]] + previous[position]) % mod;
                }
            }
            answer = (answer + current[offset]) % mod;
            previous.swap(current);
        }
        return static_cast<int>(answer);
    }
};
