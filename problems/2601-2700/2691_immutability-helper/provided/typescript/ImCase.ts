// Problem-provided driver for 2691 immutability-helper. Assembled into
// every submission by the judge ahead of the submitted code; never editable
// in the editor. This file is the hidden implementation — solvers see only
// the public API documented in the statement.
//
// The driver owns one case's (obj, mutators) pair: drive() constructs the
// submission's ImmutableHelper on the case's obj, then calls produce() once
// per mutator with a function that applies that mutator's encoded edits to
// the proxy handed over by produce. Every returned object is recorded in
// order. The judged verdict pairs the collected results with this.obj after
// all calls — the original must still equal its initial JSON, so any
// mutation that leaked into the source object fails the comparison.

type Script = { op: string; path?: any[]; value?: any; a?: any[]; b?: any[] };
type HelperFactory = new (obj: any) => {
    produce(mutator: (draft: any) => void): any;
};

class ImCase {
    readonly obj: any;
    readonly mutators: Script[][];
    private results: any[] = [];

    // The interactive wrapper hands the oracle one array of the manifest's
    // construct values (obj, mutators) plus the query budget (unused — a
    // fixed mutator list needs no call accounting).
    constructor([obj, mutators]: any[], budget?: any) {
        void budget;
        this.obj = obj;
        this.mutators = mutators;
    }

    // Call the submission's helper factory with this case's inputs and run
    // every mutator through produce, collecting each returned object.
    drive(ImmutableHelper: HelperFactory): void {
        const helper = new ImmutableHelper(this.obj);
        for (const script of this.mutators) {
            this.results.push(helper.produce((draft: any) => this.applyScript(draft, script)));
        }
    }

    // Apply one encoded mutator to the draft (the proxied object produce
    // hands to its mutator). A script is a stack program: const/get push,
    // add/sub/mul combine the two stack tops, set assigns the stack top at
    // a path, swap exchanges two leaves. Reads see earlier writes in the
    // same script; nothing outside the draft is ever touched.
    private applyScript(draft: any, script: Script[]): void {
        const stack: any[] = [];
        const parentOf = (path: any[]): [any, any] => {
            let node = draft;
            for (let index = 0; index < path.length - 1; index++) {
                node = node[path[index]];
            }
            return [node, path[path.length - 1]];
        };
        for (const op of script) {
            switch (op.op) {
                case "const":
                    stack.push(op.value);
                    break;
                case "get": {
                    let node = draft;
                    for (const step of op.path!) {
                        node = node[step];
                    }
                    stack.push(node);
                    break;
                }
                case "add":
                case "sub":
                case "mul": {
                    const right = stack.pop();
                    const left = stack.pop();
                    stack.push(op.op === "add" ? left + right : op.op === "sub" ? left - right : left * right);
                    break;
                }
                case "set": {
                    const value = stack.pop();
                    const [parent, key] = parentOf(op.path!);
                    parent[key] = value;
                    break;
                }
                case "swap": {
                    const [leftParent, leftKey] = parentOf(op.a!);
                    const [rightParent, rightKey] = parentOf(op.b!);
                    const held = leftParent[leftKey];
                    leftParent[leftKey] = rightParent[rightKey];
                    rightParent[rightKey] = held;
                    break;
                }
                default:
                    throw new Error("Unknown script op: " + op.op);
            }
        }
    }

    verdict(): { results: any[]; original: any } {
        return { results: this.results, original: this.obj };
    }
}
