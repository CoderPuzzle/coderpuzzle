from typing import List, Optional


class Solution:
    def deleteDuplicateFolder(self, paths: List[List[str]]) -> List[List[str]]:
        root = {"children": {}, "id": 0}
        next_id = 1
        for path in paths:
            node = root
            for name in path:
                if name not in node["children"]:
                    child = {"children": {}, "id": next_id}
                    next_id += 1
                    node["children"][name] = child
                node = node["children"][name]

        # collect all nodes
        nodes = []
        stack = [root]
        while stack:
            node = stack.pop()
            nodes.append(node)
            stack.extend(node["children"].values())

        # assign subtree signature ids in post-order
        sig_to_id = {}
        sig_counts = {}
        node_sig = {}
        for node in reversed(nodes):
            key = tuple(sorted((name, node_sig[child["id"]]) for name, child in node["children"].items()))
            if key not in sig_to_id:
                sig_to_id[key] = len(sig_to_id)
            sid = sig_to_id[key]
            node_sig[node["id"]] = sid
            sig_counts[sid] = sig_counts.get(sid, 0) + 1

        marked = set()
        for node in nodes:
            if node["children"] and sig_counts[node_sig[node["id"]]] >= 2:
                stack = [node]
                while stack:
                    cur = stack.pop()
                    marked.add(cur["id"])
                    stack.extend(cur["children"].values())

        result = []

        def collect(node, prefix):
            for name, child in node["children"].items():
                if child["id"] in marked:
                    continue
                result.append(prefix + [name])
                collect(child, prefix + [name])

        collect(root, [])
        result.sort()
        return result
