class EventManager {
  public:
    EventManager(vector<vector<int>> events);
    void updatePriority(int eventId, int newPriority);
    int pollHighest();
};
