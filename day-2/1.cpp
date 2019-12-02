#include<stdio.h>

int main(void) {
  int v[1000];
  int n = 0;

  while(scanf("%d,", v+n++) != EOF);
  n--;

  v[1] = 12;
  v[2] = 2;

  for (int i = 0; i < n; i+=4) {
    if (v[i] == 99) break;

    if (v[i] == 1) {
      v[v[i+3]] = v[v[i+1]] + v[v[i+2]];
    } else {
      v[v[i+3]] = v[v[i+1]] * v[v[i+2]];
    }
  }

  printf("%d\n", v[0]);

  return 0;
}
