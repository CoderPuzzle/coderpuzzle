class LogSystem {
  public:
    LogSystem();
    void put(int id, string timestamp);
    vector<int> retrieve(string start, string end, string granularity);
};
