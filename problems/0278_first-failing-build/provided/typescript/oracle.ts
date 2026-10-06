// Problem-provided oracle (BuildInspector), TypeScript side. Compiled
// with every submission by the judge; never editable in the editor.
// Constructed from the case state: the hidden first bad version
// (generic value) and the query budget. Integers may arrive as BigInt
// for exactness.
class BuildInspector {
    private bad: number;
    private budget: number;

    constructor(construction: any[], budget: any) {
        this.bad = Number(construction[0]);
        this.budget = Number(budget);
    }

    isFailingBuild(version: number): boolean {
        if (this.budget <= 0) {
            throw new Error("BuildInspector query budget exhausted");
        }
        this.budget -= 1;
        return version >= this.bad;
    }
}
