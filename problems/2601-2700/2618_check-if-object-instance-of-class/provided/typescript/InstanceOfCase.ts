// bundle-provided case carrier for this problem (not editable here; the
// judge assembles this source into every submission):
//   InstanceOfCase exposes the problem's one judged invocation: .obj is
//   the value handed to checkIfInstanceOf as its first argument and .cls
//   the class handed over as its second. Both are materialized from
//   declarative descriptors — {"kind": "undefined"} | {"kind": "null"} |
//   {"kind": "value", "value": v} | {"kind": "date"} |
//   {"kind": "builtin", "name": X} | {"kind": "arrow"} plus, for the
//   case's declared class table, {"kind": "named", "name": N} (the
//   constructor) and {"kind": "instance", "of": N} (a fresh instance).
interface CaseDescriptor {
    kind: string;
    name?: string;
    value?: any;
    of?: string;
}

class InstanceOfCase {
    obj: any;
    cls: any;
    constructor(values: any[], _queryBudget?: unknown) {
        const [classes, obj, cls] = values;
        const table = buildClassTable(classes);
        this.obj = materialize(table, obj, "obj");
        this.cls = materialize(table, cls, "cls");
    }
}

// Build the case's declared hierarchy: each entry {name, extends} becomes
// a fresh constructor whose prototype descends from its base's, so
// instances gain every method along the declared chain.
function buildClassTable(classes: { name: string; extends: string | null }[]): Map<string, new () => object> {
    const table = new Map<string, new () => object>();
    for (const entry of classes) {
        if (table.has(entry.name)) {
            throw new Error("duplicate class name: " + entry.name);
        }
        const base = entry.extends === null ? null : table.get(entry.extends);
        if (entry.extends !== null && base === undefined) {
            throw new Error("unknown base class: " + entry.extends);
        }
        function Named(this: any): void {}
        Object.defineProperty(Named, "name", { value: entry.name });
        Named.prototype = Object.create(base === null ? Object.prototype : base.prototype);
        Named.prototype.describe = function (this: any): string {
            return "instance of " + entry.name;
        };
        table.set(entry.name, Named as unknown as new () => object);
    }
    return table;
}

const BUILTINS: Record<string, any> = {
    Date: Date,
    Number: Number,
    String: String,
    Boolean: Boolean,
    Object: Object,
    Array: Array,
    Function: Function,
    RegExp: RegExp,
    Error: Error,
};

function materialize(table: Map<string, new () => object>, desc: any, side: string): any {
    if (desc === null || typeof desc !== "object" || typeof desc.kind !== "string") {
        throw new Error("malformed " + side + " descriptor");
    }
    switch ((desc as CaseDescriptor).kind) {
        case "undefined":
            return undefined;
        case "null":
            return null;
        case "value":
            return desc.value;
        case "date":
            return new Date(1700000000000);
        case "arrow":
            return (x: any) => x;
        case "builtin": {
            const builtin = BUILTINS[desc.name];
            if (builtin === undefined) {
                throw new Error("unsupported builtin: " + desc.name);
            }
            return builtin;
        }
        case "named": {
            const named = table.get(desc.name);
            if (named === undefined) {
                throw new Error("unknown class: " + desc.name);
            }
            return named;
        }
        case "instance": {
            const ctor = table.get(desc.of!);
            if (ctor === undefined) {
                throw new Error("unknown class: " + desc.of);
            }
            return new ctor();
        }
        default:
            throw new Error("unknown descriptor kind: " + desc.kind);
    }
}
