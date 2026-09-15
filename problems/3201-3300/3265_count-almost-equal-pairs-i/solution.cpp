class Solution {
  public:
    int countPairs(vector<int> &nums) {
        // The family of a value holds every number reachable by
        // exchanging two of its digits at most once, itself included;
        // swapped strings parse back through stoi, so leading zeros
        // collapse (30 -> "03" -> 3). A pair qualifies when either
        // side sits in the other's family; one swap may touch one
        // number only, so both directions are tested.
        int n = nums.size();
        vector<unordered_set<int>> families(n);
        for (int i = 0; i < n; i++) {
            string digits = to_string(nums[i]);
            unordered_set<int> &reached = families[i];
            reached.insert(nums[i]);
            for (int p = 0; p < (int)digits.size(); p++) {
                for (int q = p + 1; q < (int)digits.size(); q++) {
                    swap(digits[p], digits[q]);
                    reached.insert(stoi(digits));
                    swap(digits[p], digits[q]);
                }
            }
        }
        int pairs = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (families[i].count(nums[j]) || families[j].count(nums[i])) {
                    pairs++;
                }
            }
        }
        return pairs;
    }
};
