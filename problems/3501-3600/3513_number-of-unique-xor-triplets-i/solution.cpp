class Solution {
  public:
    // Every value lies below 2^b where b is the bit length of n, so no
    // triplet XOR can reach 2^b. For n >= 4 (n = 3 verifies by hand)
    // the pair XORs cover all of [0, 2^(b-1)): equal values give 0,
    // and any v >= 1 below 2^(b-1) is x XOR y for two distinct values
    // of [1, 2^(b-1)]. XOR-ing a covered w < 2^(b-1) with an element
    // that has the top bit set or clear produces every value in
    // [0, 2^b) — so exactly 2^b unique values appear. Below n=3 the
    // reachable values are just {1} and {1, 2}.
    int uniqueXorTriplets(vector<int> &nums) {
        int n = nums.size();
        if (n < 3)
            return n;
        int b = 0;
        while ((n >> b) > 0)
            b++;
        return 1 << b;
    }
};
