

/*
 * @lc app=leetcode.cn id=509
 *
 * [509] 斐波那契数
 *
 * https://leetcode.cn/problems/fibonacci-number/

 */

import { describe, expect, test } from '@jest/globals';

function fib(n: number): number {
    /* 暴力 耗时长 */
    // if (n < 2) return n;
    // return fib(n - 1) + fib(n - 2);

    if (n < 2) return n;

    /* 滚动数组优化 */
    let dp = [0, 1];

    /* 要计算前n项（坐标为 n - 1）的合， 所以需要遍历到坐标n */
    for (let i = 2; i <= n; i++) {
        const sum = dp[0] + dp[1];
        dp[0] = dp[1];
        dp[1] = sum;
    }

    return dp[1];
};


describe('fib module', () => {
    test('111', () => {
        expect(fib(2)).toBe(1);
    });

    test('222', () => {
        expect(fib(3)).toBe(2);
    });

    test('333', () => {
        expect(fib(4)).toBe(3);
    });
});