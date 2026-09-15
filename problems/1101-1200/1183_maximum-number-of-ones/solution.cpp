class Solution {
  public:
    int maximumNumberOfOnes(int width, int height, int sideLength, int maxOnes) {
        // Each residue class (r, c) mod sideLength appears in every window
        // exactly once, so the constraint binds classes. Count how many
        // grid cells fall into each class: full blocks plus the leftover
        // strip when the remainder reaches r (or c).
        vector<long long> counts;
        counts.reserve(sideLength * sideLength);
        for (int r = 0; r < sideLength; r++) {
            for (int c = 0; c < sideLength; c++) {
                long long rows = height / sideLength + (height % sideLength > r ? 1 : 0);
                long long cols = width / sideLength + (width % sideLength > c ? 1 : 0);
                counts.push_back(rows * cols);
            }
        }
        sort(counts.begin(), counts.end(), greater<long long>());
        long long total = 0;
        for (int i = 0; i < maxOnes; i++) {
            total += counts[i];
        }
        return (int)total;
    }
};
