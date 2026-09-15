class Solution {
  public:
    vector<int> arraysIntersection(vector<int> &arr1, vector<int> &arr2, vector<int> &arr3) {
        // One index per sorted array; the smallest current values can never
        // reappear ahead, so they are safe to step past.
        size_t i = 0, j = 0, k = 0;
        vector<int> out;
        while (i < arr1.size() && j < arr2.size() && k < arr3.size()) {
            int a = arr1[i], b = arr2[j], c = arr3[k];
            if (a == b && b == c) {
                out.push_back(a);
                ++i;
                ++j;
                ++k;
                continue;
            }
            int smallest = min(a, min(b, c));
            if (a == smallest)
                ++i;
            if (b == smallest)
                ++j;
            if (c == smallest)
                ++k;
        }
        return out;
    }
};
