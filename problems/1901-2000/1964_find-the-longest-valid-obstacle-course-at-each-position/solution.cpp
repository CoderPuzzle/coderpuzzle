class Solution {
  public:
    vector<int> longestObstacleCourseAtEachPosition(vector<int> &obstacles) {
        int n = obstacles.size();
        // tails[j] = smallest possible tail of a non-decreasing subsequence
        // of length j+1 over the prefix so far; it stays sorted, so each
        // obstacle is placed by binary search.
        vector<int> tails;
        tails.reserve(n);
        vector<int> ans;
        ans.reserve(n);
        for (int x : obstacles) {
            // upper_bound = first strictly greater tail: an obstacle equal
            // to a tail extends that course instead of replacing it -- the
            // only change vs strict LIS.
            int i = upper_bound(tails.begin(), tails.end(), x) - tails.begin();
            if (i == (int)tails.size())
                tails.push_back(x); // new longest course
            else
                tails[i] = x; // keep the length-(i+1) tail minimal
            // Insertion index + 1 = longest course ending with this obstacle.
            ans.push_back(i + 1);
        }
        return ans;
    }
};
