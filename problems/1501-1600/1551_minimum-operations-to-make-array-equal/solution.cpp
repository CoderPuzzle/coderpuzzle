class Solution {
  public:
    int minOperations(int n) {
        int64_t m = n;
        return static_cast<int>((m * m) / 4);
    }
};
