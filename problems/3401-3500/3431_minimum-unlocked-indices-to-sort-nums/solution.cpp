class Solution {
  public:
    // A swap only exchanges values differing by exactly 1, so a 1 and a 3
    // can never trade places: any 3 sitting before a 1 dooms the array.
    // Otherwise 1s only ever move left and 3s only ever move right, and
    // every swap they need lands on a boundary between the first 2 and
    // the last 1, or between the first 3 and the last 2.
    int minUnlockedIndices(vector<int> &nums, vector<int> &locked) {
        int n = (int)nums.size();
        int first2 = n, first3 = n, last1 = -1, last2 = -1;
        for (int i = 0; i < n; i++) {
            if (nums[i] == 1) {
                last1 = i;
            } else if (nums[i] == 2) {
                if (i < first2) {
                    first2 = i;
                }
                last2 = i;
            } else if (i < first3) {
                first3 = i;
            }
        }
        if (first3 < last1) {
            return -1;
        }
        int total = 0;
        for (int i = 0; i < n; i++) {
            bool forced = (first2 <= i && i < last1) || (first3 <= i && i < last2);
            if (locked[i] == 1 && forced) {
                total++;
            }
        }
        return total;
    }
};
