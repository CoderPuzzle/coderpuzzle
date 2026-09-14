# 生产环境综合压测报告

## 结论

2026-09-14 UTC 在生产 GCP VM 上完成了覆盖多类题型和多种编程语言的综合判题压测。48 个问题、语言组合全部成功完成，基线批次和并发批次的判题结果均无失败。

并发批次产生了真实排队：队列等待时间中位数为 9,464 ms，最大值为 23,324 ms。排队前后，同一问题、同一语言、同一份解答的 runner wall time 大多数完全相同；差异主要出现在编译型语言的编译和调度抖动，未观察到随队列位置增长的执行时间漂移。

## 环境

- GCP 项目：`zdong-14850-alefa-ai`
- VM：`katze`，区域 `us-east4-a`
- 规格：`c4d-highcpu-4`，4 vCPU、2 个物理核心
- 压测入口：VM 内部 `http://127.0.0.1:8081/api`
- runner：生产资源隔离代码，当前部署配置为 shared profile
- 压测期间 API 并发接入上限临时设置为 32，以便请求进入 runner 队列
- runner 实际并发槽位为 1，因此并发批次能够填满队列
- 未申请固定外部 IP；本轮 VM 临时 IP 为 `34.145.193.13`

## 测试矩阵

测试清单包含 48 个笛卡尔积组合：

| 类别 | 问题 | 语言覆盖 |
|---|---|---|
| 单线程 | Two Sum、Valid Parentheses、First Bad Version、Flatten Nested List Iterator、Guess Number Higher or Lower、N-ary Tree Preorder Traversal | Python、C++、Go、Rust、Java、JavaScript、TypeScript |
| 多线程 | Print in Order、Print FooBar Alternately | Python、Java |
| provider/oracle/utility | First Bad Version、Guess Number Higher or Lower、N-ary Tree Preorder Traversal、Flatten Nested List Iterator | Python、C++、Go、Rust、Java、JavaScript、TypeScript |
| SQL | Combine Two Tables、Second Highest Salary | SQL |

每个组合使用题库中的 designated reference source，避免手工实现差异影响比较。

## 执行方式

1. 为并发客户端创建 24 个独立测试账号。
2. 每个矩阵单元执行一次基线请求，按顺序提交。
3. 对同一批 48 个单元启动 24 个并发客户端，形成突发批次。
4. 每个任务记录 HTTP 状态、判题状态、job ID、queue time、compile time、runner wall time、CPU time、资源 profile 和逐 testcase 指标。
5. 测试完成后删除全部 24 个测试账号，恢复 API 默认并发配置，并重新检查健康状态。

## 结果

| 指标 | 基线 | 并发突发 |
|---|---:|---:|
| 任务数 | 48 | 48 |
| 失败数 | 0 | 0 |
| queue time 中位数 | 23.5 ms | 9,464 ms |
| queue time 最大值 | 40 ms | 23,324 ms |
| runner wall time 中位数 | 126 ms | 126 ms |
| HTTP response time 中位数 | 613 ms | 10,742 ms |

HTTP response time 在并发批次明显增加，增量来自排队；runner wall time 没有同步增加，说明排队等待和实际执行时间已经被正确区分。

## 公平性比较

将每个 `(problem, language, source_sha256)` 分组，比较其基线和并发批次的 runner wall time：

- 48 个组合全部有成对样本。
- 绝大多数组合的 wall time 比值为 `1.0`。
- 典型解释型语言、SQL 和多线程组合在排队后保持相同 wall time。
- 少数编译型组合出现有限抖动：
  - `first-bad-version/java`：约 `1.40x`
  - `guess-number-higher-or-lower/java`：约 `0.79x`
  - `two-sum/go`、`guess-number-higher-or-lower/cpp`：约 `0.74x`
  - `combine-two-tables/sql`：约 `0.69x`
- 这些样本的绝对 wall time 很短，变化主要落在编译和进程启动成本；没有发现队列位置与 runner wall time 正相关的迹象。

本轮结果支持以下不变量：任务排队不会改变任务获得的执行资源预算，也不会把等待时间计入 runner wall time。若要建立更严格的统计置信区间，下一轮应对每个单元重复多个基线样本和多个排队样本，并单独报告编译时间与执行时间。

## 清理与恢复

- 删除 24 个 `resource-stress-20260913-*` 测试账号及其身份、session 数据。
- 恢复 API 默认并发限制。
- 健康检查返回 `{"status":"ok"}`。
- VM 保持 `c4d-highcpu-4`，没有再次 resize，也没有申请固定 IP。

## 代码与验证

压测计时和 job 审计支持已提交并推送：

`2cf29da Add judge stress timing instrumentation`

本地验证结果：`186 passed, 11 skipped, 66 subtests passed`。

