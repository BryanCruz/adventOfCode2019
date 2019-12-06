#include <iostream>
#include <string>
#include <list>
#include <map>

#define ms map<string, list<string>>

using namespace std;

ms nodes;

int count_childs(string n) {
  int tot = 0;
  for (list<string>::iterator it = nodes[n].begin(); it != nodes[n].end(); it++) {
    tot += 1 + count_childs(*it);
  }

  return tot;
}

int main (void) {
  string tmp;
  while (cin >> tmp) {
    string a = tmp.substr(0, 3);
    string b = tmp.substr(4, 3);

    nodes[a].push_back(b);
  }

  int tot = 0;
  for (ms::iterator it = nodes.begin(); it != nodes.end(); it++) {
    tot += count_childs(it->first);
  }

  cout << tot << endl;
  return 0; 
}
