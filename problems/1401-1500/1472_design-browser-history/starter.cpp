class BrowserHistory {
  public:
    BrowserHistory(string homepage);
    void visit(string url);
    string back(int steps);
    string forward(int steps);
};
