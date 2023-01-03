# Description: Coin Change using Dynamic Programming
# Author: Izaias Machado
# Date: 2023-01-03 (yyyy-mm-dd)
# License: MIT

def coinChangeDP(coins, n, sum):
    dp = [[-1 for i in range(sum + 1)] for j in range(n + 1)]
    return coinChangeDPHelper(coins, n, sum, dp)

def coinChangeDPHelper(coins, n, sum, dp):
    if sum == 0:
        return 1

    if sum < 0 or n == 0:
        return 0

    if dp[n][sum] != -1:
        return dp[n][sum]

    result = coinChangeDPHelper(coins, n - 1, sum, dp); # exclude the coin
    result += coinChangeDPHelper(coins, n, sum - coins[n - 1], dp); # include the coin
    dp[n][sum] = result

    return result
