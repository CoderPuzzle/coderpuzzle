class Solution {
  public:
    // A defective readout agrees with the truth up to the dropped point
    // and then matches the truth shifted one place left, so each candidacy
    // is a single scan; when both scans succeed (or both fail), the defect
    // cannot be pinned on either sensor.
    int badSensor(vector<int> &sensor1, vector<int> &sensor2) {
        bool one = shifted(sensor1, sensor2);
        bool two = shifted(sensor2, sensor1);
        if (one == two)
            return -1;
        return one ? 1 : 2;
    }

  private:
    bool shifted(const vector<int> &a, const vector<int> &b) {
        int i = 0;
        while (i < (int)a.size() && a[i] == b[i])
            ++i;
        while (i < (int)a.size() - 1) {
            if (a[i] != b[i + 1])
                return false;
            ++i;
        }
        return true;
    }
};
