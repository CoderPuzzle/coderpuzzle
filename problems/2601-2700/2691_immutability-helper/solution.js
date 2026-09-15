// Copy-on-write through a Proxy: reads traverse lazily-created proxies over
// the ORIGINAL nodes (nothing is copied until a write happens), while every
// write lands in a per-node "shadow" of overrides instead of the target.
// materialize() then rebuilds only the spine from the root down to written
// nodes, sharing every untouched subtree with the original.
class ImmutableHelper {
    constructor(obj) {
        this.source = obj;
    }

    produce(mutator) {
        const shadows = new Map(); // original node -> {key: written value}
        const proxies = new Map(); // original node -> proxy standing in for it

        const proxyFor = (node) => {
            if (node === null || typeof node !== "object") {
                return node;
            }
            if (!proxies.has(node)) {
                const proxy = new Proxy(node, {
                    get(target, key) {
                        const shadow = shadows.get(target);
                        if (shadow !== undefined && key in shadow) {
                            return shadow[key]; // a value written earlier wins
                        }
                        const value = target[key];
                        return value !== null && typeof value === "object" ? proxyFor(value) : value;
                    },
                    set(target, key, value) {
                        let shadow = shadows.get(target);
                        if (shadow === undefined) {
                            shadow = {};
                            shadows.set(target, shadow); // first write copies
                        }
                        shadow[key] = value;
                        return true;
                    },
                });
                proxies.set(node, proxy);
            }
            return proxies.get(node);
        };

        mutator(proxyFor(this.source));

        const shared = new Set(); // subtrees proven unchanged (shareable)
        const materialize = (node) => {
            if (node === null || typeof node !== "object") {
                return node;
            }
            if (shared.has(node)) {
                return node;
            }
            const shadow = shadows.get(node) || {};
            let changed = Object.keys(shadow).length > 0;
            const copy = Array.isArray(node) ? [] : {};
            for (const key of Object.keys(node)) {
                const child = key in shadow ? shadow[key] : materialize(node[key]);
                copy[key] = child;
                if (child !== node[key]) {
                    changed = true; // a rebuilt descendant forces a copy here
                }
            }
            if (!changed) {
                shared.add(node);
                return node; // untouched: keep the original subtree itself
            }
            for (const key of Object.keys(shadow)) {
                if (!(key in node)) {
                    copy[key] = shadow[key]; // keys the mutator added
                }
            }
            return copy;
        };

        return materialize(this.source);
    }
}

class Solution {
    run(imCase) {
        imCase.drive(ImmutableHelper);
    }
}
