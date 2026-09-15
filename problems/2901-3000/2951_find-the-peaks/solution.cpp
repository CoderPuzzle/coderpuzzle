class Solution {
  public:
    vector<int> findPeaks(vector<int> &mountain) {
        int n = mountain.size();
        vector<int> peaks;
        for (int i = 1; i < n - 1; i++)
            if (mountain[i] > mountain[i - 1] && mountain[i] > mountain[i + 1])
                peaks.push_back(i);
        return peaks;
    }
};
