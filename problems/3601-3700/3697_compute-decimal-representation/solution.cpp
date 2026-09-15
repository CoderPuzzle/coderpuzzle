class Solution {
  public:
    vector<int> decimalRepresentation(int n) {
        // Each nonzero digit contributes exactly one base-10 component --
        // its digit times the place it sits at -- and this count is optimal:
        // adding terms can only merge nonzero positions, never create them.
        vector<int> components;
        // The place walks one step past 10^9 on the final multiply, so it
        // needs more headroom than int provides.
        long long place = 1;
        while (n > 0) {
            long long digit = n % 10;
            if (digit > 0) {
                components.push_back(static_cast<int>(digit * place));
            }
            n /= 10;
            place *= 10;
        }
        // Peeled from the ones place up, so reverse into descending order.
        reverse(components.begin(), components.end());
        return components;
    }
};
