class Solution {
  public:
    int distributeCandies(vector<int> &candyType) {
        // Two caps compete: Alice eats at most n / 2 candies, and there are
        // only as many types as distinct values. Each eaten candy can be a
        // new type until the types or the allowance runs out, so the answer
        // is the smaller of the distinct count and half the length.
        unordered_set<int> types(candyType.begin(), candyType.end());
        return min((int)types.size(), (int)candyType.size() / 2);
    }
};
