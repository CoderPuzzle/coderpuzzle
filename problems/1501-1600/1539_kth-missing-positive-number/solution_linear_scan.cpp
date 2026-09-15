class Solution {
  public:
    int findKthPositive(vector<int> &arr, int k) {
        // Read the absent positives straight off the array, gap by gap:
        // every integer strictly between prev and v is absent, so the gap
        // holds exactly v - prev - 1 of them.
        int prev = 0;
        for (int v : arr) {
            int gap = v - prev - 1;
            if (k <= gap) {
                // The kth still-owed absent positive sits k integers past
                // prev, inside the gap just reached.
                return prev + k;
            }
            k -= gap;
            prev = v;
        }
        // The walk never broke, so the absent positives left owed run
        // consecutively past the last element.
        return prev + k;
    }
};
