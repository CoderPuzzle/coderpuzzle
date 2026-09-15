class EventManager {
  public:
    // A lazy-deletion max-heap: every priority update pushes a fresh entry,
    // and pollHighest skips entries whose stored priority no longer matches
    // the live map value. Heap entries are (priority, -eventId), so the
    // max-heap yields the highest priority with the smallest eventId on
    // ties.
    EventManager(vector<vector<int>> events) {
        for (auto &event : events) {
            priority_[event[0]] = event[1];
            heap_.push({event[1], -event[0]});
        }
    }

    void updatePriority(int eventId, int newPriority) {
        priority_[eventId] = newPriority;
        heap_.push({newPriority, -eventId});
    }

    int pollHighest() {
        while (!heap_.empty()) {
            auto entry = heap_.top();
            heap_.pop();
            int event_id = -entry.second;
            if (priority_.count(event_id) && priority_[event_id] == entry.first) {
                priority_.erase(event_id);
                return event_id;
            }
        }
        return -1;
    }

  private:
    unordered_map<int, int> priority_;
    priority_queue<pair<int, int>> heap_;
};
