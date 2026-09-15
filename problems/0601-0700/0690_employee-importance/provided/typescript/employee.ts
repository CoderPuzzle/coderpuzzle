// Problem-provided record class (LC 690 contract). The judge's decoder
// constructs Employee(id, importance, subordinates) positionally.
class Employee {
    id: number;
    importance: number;
    subordinates: number[];
    constructor(id: number, importance: number, subordinates: number[]) {
        this.id = id;
        this.importance = importance;
        this.subordinates = subordinates;
    }
}
