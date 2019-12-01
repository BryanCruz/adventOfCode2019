#include <bits/stdc++.h>

using namespace std;

int findFuel(int mass) {
    return (mass / 3) - 2;
}

int main (void) {
    ios_base::sync_with_stdio(false);

    int sum = 0;
    int mass;
    while(scanf("%d", &mass) != EOF) {
        sum += findFuel(mass);
    }

    printf("%d\n", sum);
    return 0;
}

