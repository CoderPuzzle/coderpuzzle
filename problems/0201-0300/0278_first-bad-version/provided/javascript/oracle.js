// Problem-provided oracle (VersionControl), JavaScript side. Evaluated
// with every submission by the judge; never editable in the editor.
// Constructed from the case state: the hidden first bad version
// (generic value) and the query budget. Integers may arrive as BigInt
// for exactness.
class VersionControl {
    constructor(construction, budget) {
        this.bad = Number(construction[0]);
        this.budget = Number(budget);
    }

    isBadVersion(version) {
        if (this.budget <= 0) {
            throw new Error("VersionControl query budget exhausted");
        }
        this.budget -= 1;
        return version >= this.bad;
    }
}
