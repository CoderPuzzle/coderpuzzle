class Solution {
  public:
    // Each element may land anywhere in [v-k, v+k]; assigning the values in
    // sorted order leaves every element the smallest value that is still
    // free and inside its window, which never hurts later ones.
    int maxDistinctElements(vector<int> &nums, int k) {
        vector<long long> a(nums.begin(), nums.end());
        sort(a.begin(), a.end());
        long long last = a[0] - k - 1;
        int count = 0;
        for (long long v : a) {
            long long target = v - k;
            if (target <= last)
                target = last + 1;
            if (target <= v + k) {
                last = target;
                ++count;
            }
        }
        return count;
    }
};
