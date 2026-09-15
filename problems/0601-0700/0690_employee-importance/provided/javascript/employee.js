// Problem-provided record class (LC 690 contract). The judge's decoder
// constructs Employee(id, importance, subordinates) positionally.
class Employee {
    constructor(id, importance, subordinates) {
        this.id = id;
        this.importance = importance;
        this.subordinates = subordinates;
    }
}
