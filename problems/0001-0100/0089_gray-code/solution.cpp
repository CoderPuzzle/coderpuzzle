class Solution {
  public:
    vector<int> grayCode(int n) {
        vector<int> code;
        code.reserve(1 << n);
        // The pinned order is its own recipe: element at index i is i ^ (i >> 1),
        // the standard reflected gray code. One loop, no post-processing.
        for (int i = 0; i < (1 << n); ++i) {
            code.push_back(i ^ (i >> 1));
        }
        return code;
    }
};
