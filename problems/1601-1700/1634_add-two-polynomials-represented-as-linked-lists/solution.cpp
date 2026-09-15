class Solution {
  public:
    vector<vector<int>> addPoly(vector<vector<int>> &poly1, vector<vector<int>> &poly2) {
        vector<vector<int>> result;
        int i = 0, j = 0;
        while (i < (int)poly1.size() && j < (int)poly2.size()) {
            int power1 = poly1[i][0];
            int power2 = poly2[j][0];
            if (power1 == power2) {
                int coefficient = poly1[i][1] + poly2[j][1];
                if (coefficient != 0) {
                    result.push_back({power1, coefficient});
                }
                i++;
                j++;
            } else if (power1 > power2) {
                result.push_back(poly1[i]);
                i++;
            } else {
                result.push_back(poly2[j]);
                j++;
            }
        }
        while (i < (int)poly1.size()) {
            result.push_back(poly1[i]);
            i++;
        }
        while (j < (int)poly2.size()) {
            result.push_back(poly2[j]);
            j++;
        }
        return result;
    }
};
