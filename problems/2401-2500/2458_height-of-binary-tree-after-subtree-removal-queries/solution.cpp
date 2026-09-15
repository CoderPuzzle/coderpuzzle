class Solution {
    struct Frame {
        TreeNode *node;
        int mx;
    };

  public:
    vector<int> treeQueries(TreeNode *root, vector<int> &queries) {
        if (root == nullptr) {
            return vector<int>(queries.size(), 0);
        }

        unordered_map<int, int> depth, height, submax;

        // iterative pre-order for depth + post-order for height/submax
        vector<TreeNode *> order;
        vector<TreeNode *> stack = {root};
        depth[root->val] = 0;
        while (!stack.empty()) {
            TreeNode *u = stack.back();
            stack.pop_back();
            order.push_back(u);
            if (u->left) {
                depth[u->left->val] = depth[u->val] + 1;
                stack.push_back(u->left);
            }
            if (u->right) {
                depth[u->right->val] = depth[u->val] + 1;
                stack.push_back(u->right);
            }
        }

        for (int k = (int)order.size() - 1; k >= 0; k--) {
            TreeNode *u = order[k];
            int h = 0;
            if (u->left) {
                h = max(h, 1 + height[u->left->val]);
            }
            if (u->right) {
                h = max(h, 1 + height[u->right->val]);
            }
            height[u->val] = h;
            int sm = depth[u->val] + h;
            if (u->left) {
                sm = max(sm, submax[u->left->val]);
            }
            if (u->right) {
                sm = max(sm, submax[u->right->val]);
            }
            submax[u->val] = sm;
        }

        unordered_map<int, int> ans;
        vector<Frame> st;
        st.push_back({root, -1});
        while (!st.empty()) {
            auto [u, mx] = st.back();
            st.pop_back();
            ans[u->val] = mx;
            TreeNode *left = u->left;
            TreeNode *right = u->right;
            int dv = depth[u->val];
            if (left) {
                int hWithoutLeft = right ? 1 + height[right->val] : 0;
                int newMx = mx;
                if (dv + hWithoutLeft > newMx) {
                    newMx = dv + hWithoutLeft;
                }
                if (right && submax[right->val] > newMx) {
                    newMx = submax[right->val];
                }
                st.push_back({left, newMx});
            }
            if (right) {
                int hWithoutRight = left ? 1 + height[left->val] : 0;
                int newMx = mx;
                if (dv + hWithoutRight > newMx) {
                    newMx = dv + hWithoutRight;
                }
                if (left && submax[left->val] > newMx) {
                    newMx = submax[left->val];
                }
                st.push_back({right, newMx});
            }
        }

        vector<int> res;
        res.reserve(queries.size());
        for (int q : queries) {
            res.push_back(ans[q]);
        }
        return res;
    }
};
