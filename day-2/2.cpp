#include<stdio.h>
#include<cstring>

#define TARGET 19690720

int main(void) {
  int v_orig[1000];
  int v[1000];
  int n = 0;
  int tmp;

  while(scanf("%d,", v_orig+n++) != EOF);
  n--;

  int a;
  int b;

  for (a = 0; a <= 99; a++) {
    for (b = 0; b <= 99; b++) {
      memcpy(v, v_orig, sizeof(v_orig));
      v[1] = a;
      v[2] = b;

      for (int i = 0; i < n; i+=4) {
        if (v[i] == 99) break;

        int t0 = v[i+3];
        int t1 = v[i+1];
        int t2 = v[i+2];

        if (t0 >= n || t1 >= n || t2 >= n) {v[0] = -1; break;}

        if (v[i] == 1) {
          v[t0] = v[t1] + v[t2];
        } else {
          v[t0] = v[t1] * v[t2];
        }
      }

      if (v[0] == TARGET) break;
    }
    if (v[0] == TARGET) break;
  }

  printf("%d\n", 100*a+b);

  return 0;
}
