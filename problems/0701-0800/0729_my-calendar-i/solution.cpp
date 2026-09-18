#include <vector>

class MyCalendar {
  public:
    MyCalendar() = default;

    bool book(int start, int end) {
        // bisect_right: first index whose start exceeds `start`.
        int low = 0;
        int high = (int)starts.size();
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (starts[mid] <= start) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        int index = low - 1; // last reservation with start <= start
        // Half-open intervals: strict tests mean touching endpoints coexist.
        if (index >= 0 && ends[index] > start) {
            return false;
        }
        if (index + 1 < (int)starts.size() && starts[index + 1] < end) {
            return false;
        }
        // Insert exactly at the searched position — stays sorted, no re-sort.
        starts.insert(starts.begin() + low, start);
        ends.insert(ends.begin() + low, end);
        return true;
    }

  private:
    // Accepted reservations as parallel sorted starts/ends vectors: a new
    // event can only conflict with the reservation before and after its
    // insertion point.
    std::vector<int> starts;
    std::vector<int> ends;
};
