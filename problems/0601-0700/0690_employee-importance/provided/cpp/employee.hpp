struct Employee {
  int id;
  int importance;
  std::vector<int> subordinates;
  Employee() : id(0), importance(0), subordinates() {}
  Employee(int id_, int importance_, std::vector<int> subordinates_)
      : id(id_), importance(importance_),
        subordinates(std::move(subordinates_)) {}
};
