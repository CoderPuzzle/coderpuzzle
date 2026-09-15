// makeImmutable never copies or freezes anything: it wraps obj in a Proxy
// whose set trap throws the documented string for every write — the object
// form "Error Modifying: ${key}", the array form "Error Modifying Index:
// ${index}" — whose array get trap hands back a throwing stub for the
// seven mutating methods, and whose get trap recursively wraps every
// object-valued read. Nested objects and arrays are therefore guarded the
// moment they are reached, while plain reads, Object.keys, iteration, and
// non-mutating methods pass straight through to the real target.
const MUTATING_METHODS = ["pop", "push", "shift", "unshift", "splice", "sort", "reverse"];

function wrapReads(value: any): any {
    if (value !== null && typeof value === "object") {
        return makeImmutable(value);
    }
    return value;
}

function makeImmutable(obj: any): any {
    if (Array.isArray(obj)) {
        return new Proxy(obj, {
            get(target: any, property: any, receiver: any): any {
                if (MUTATING_METHODS.includes(property)) {
                    return (): never => {
                        throw `Error Calling Method: ${property}`;
                    };
                }
                return wrapReads(Reflect.get(target, property, receiver));
            },
            set(target: any, property: any): boolean {
                throw `Error Modifying Index: ${property}`;
            },
        });
    }
    return new Proxy(obj, {
        get(target: any, property: any, receiver: any): any {
            return wrapReads(Reflect.get(target, property, receiver));
        },
        set(target: any, property: any): boolean {
            throw `Error Modifying: ${property}`;
        },
    });
}

class Solution {
    run(objCase: ObjCase): void {
        objCase.drive(makeImmutable);
    }
}
