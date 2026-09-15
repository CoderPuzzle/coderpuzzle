class Solution {
  public:
    vector<int> secondGreaterElement(vector<int> &nums) {
        int n = nums.size();
        vector<int> result(n, -1);
        vector<int> first;  // indices awaiting their first greater value
        vector<int> second; // indices awaiting their second greater value
        vector<int> batch;
        for (int i = 0; i < n; i++) {
            int x = nums[i];
            while (!second.empty() && nums[second.back()] < x) {
                result[second.back()] = x;
                second.pop_back();
            }
            batch.clear();
            while (!first.empty() && nums[first.back()] < x) {
                batch.push_back(first.back());
                first.pop_back();
            }
            // batch leaves the first stack in increasing value order; push it
            // back-to-front so the second stack keeps its smallest value on top
            for (int j = (int)batch.size() - 1; j >= 0; j--) {
                second.push_back(batch[j]);
            }
            first.push_back(i);
        }
        return result;
    }
};
