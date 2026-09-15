class Robot {
  public:
    Robot(int width, int height);
    void step(int num);
    vector<int> getPos();
    string getDir();
};
