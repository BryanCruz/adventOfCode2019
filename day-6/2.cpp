#include <iostream>
#include <string>
#include <list>
#include <map>
#include <map>
#include <queue>
#include <utility>

#define ls list<string>
#define ms map<string, ls>
#define si pair<string, int>

using namespace std;

ms nodes;
map<string, bool> already;;

queue<si> q;

int find_SAN() {
  while (true) {
    si cn = q.front();
    q.pop();

    if (cn.first == "SAN") {
      return cn.second;
    }

    already[cn.first] = true;
    for (ls::iterator it = nodes[cn.first].begin(); it != nodes[cn.first].end(); it++) {

      if (!already[*it])
        q.push(si(*it, cn.second + 1));
    }
  }
}

int main (void) {
  string tmp;
  while (cin >> tmp) {
    string a = tmp.substr(0, 3);
    string b = tmp.substr(4, 3);

    nodes[a].push_back(b);
    nodes[b].push_back(a);
  }

  q.push(si("YOU", -2));
  cout << find_SAN() << endl;
  return 0; 
}
