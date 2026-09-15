class ThroneInheritance {
  public:
    ThroneInheritance(string kingName);
    void birth(string parentName, string childName);
    void death(string name);
    vector<string> getInheritanceOrder();
};
