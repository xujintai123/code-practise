/*
 * @lc app=leetcode.cn id=746
 *
 * [746] 使用最小花费爬楼梯
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode.cn/problems/min-cost-climbing-stairs/
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

import { describe, expect, test } from '@jest/globals';

function minCostClimbingStairs(cost: number[]): number {
    // 爬到第 n  层需要花费的费用 （第 n 层不需要消费）
    // dp(n) = Math.min(dp(n - 1) + cost[n - 1], dp(n - 2) + + cost[n - 2])

    // dp下标 从 0 开始初始化
    // dp(0) = 0；爬到第1层需要花费的费用

    // dp(1) = 0；爬到第2层需要花费的费用

    // dp[2] = dp(1) + cost[n - 1], dp(0) + cost[n - 2] 爬到第2层需要花费的费用

    // 本题实际需要到达的楼层数为 cost.length + 1 层；
    // 由于 dp 从下标 0 开始 初始化（第一层），所以 num 为 cost.length（下标值cost.length， 对应长度cost.length + 1）
    let dp = [0, 0], num = cost.length;
    // 下标从2开始，表示从到达第三层开始
    for (let n = 2; n <= num; n++) {
        let sum = Math.min(dp[1] + cost[n - 1], dp[0] + cost[n - 2]);
        dp[0] = dp[1];
        dp[1] = sum;
    }

    return dp[1];
};


describe('fib module', () => {
    test('111', () => {
        expect(minCostClimbingStairs([10,15,20])).toBe(15);
    });

    test('222', () => {
        expect(minCostClimbingStairs([1,100,1,1,1,100,1,1,100,1])).toBe(6);
    });
});