class Solution {
  public:
    vector<int> twoOutOfThree(vector<int> &nums1, vector<int> &nums2, vector<int> &nums3) {
        array<int, 101> masks{};
        addMembership(masks, nums1, 1);
        addMembership(masks, nums2, 2);
        addMembership(masks, nums3, 4);

        vector<int> answer;
        for (int value = 1; value <= 100; ++value) {
            int mask = masks[value];
            if ((mask & (mask - 1)) != 0) {
                answer.push_back(value);
            }
        }
        return answer;
    }

  private:
    void addMembership(array<int, 101> &masks, const vector<int> &nums, int bit) {
        for (int value : nums) {
            masks[value] |= bit;
        }
    }
};
