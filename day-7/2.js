"use strict";

let s =
  "3,8,1001,8,10,8,105,1,0,0,21,38,55,64,89,114,195,276,357,438,99999,3,9,101,3,9,9,102,3,9,9,1001,9,5,9,4,9,99,3,9,101,2,9,9,1002,9,3,9,101,5,9,9,4,9,99,3,9,101,3,9,9,4,9,99,3,9,1002,9,4,9,101,5,9,9,1002,9,5,9,101,5,9,9,102,3,9,9,4,9,99,3,9,101,3,9,9,1002,9,4,9,101,5,9,9,102,5,9,9,1001,9,5,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,99";

s = s.split(",").map(v => parseInt(v));
const orig_s = [...s];
s = [[...orig_s], [...orig_s], [...orig_s], [...orig_s], [...orig_s]];

let curr = 0;
const get = ([v, v_mod]) => {
  return v_mod === 0 ? s[curr][v] : v;
};

const possible_sequences = (size, already = []) => {
  if (size === 0) {
    return [[]];
  }

  const phase_settings = [5, 6, 7, 8, 9].filter(v => already.indexOf(v) === -1);

  const possible = [];
  phase_settings.forEach(v => {
    const aux = possible_sequences(size - 1, already.concat(v));

    aux.forEach(v2 => {
      possible.push([v].concat(v2));
    });
  });

  return possible;
};

let i = [0, 0, 0, 0, 0];
let inputPhaseSequence = [];
let inputOutputs = [];
let inputFromPhaseSequence = [true, true, true, true, true];

const n_params = {
  1: 3,
  2: 3,
  3: 1,
  4: 1,
  5: 2,
  6: 2,
  7: 3,
  8: 3,
  99: 0
};

const instructions = {
  1: (a, b, [c]) => {
    s[curr][c] = get(a) + get(b);
  },
  2: (a, b, [c]) => {
    s[curr][c] = get(a) * get(b);
  },
  3: ([a]) => {
    if (inputFromPhaseSequence[curr]) s[curr][a] = inputPhaseSequence.shift();
    else s[curr][a] = inputOutputs.shift();

    inputFromPhaseSequence[curr] = false;
  },
  4: a => {
    console.log("output", get(a));
    console.log("curr", curr);
    inputOutputs.push(get(a));
    curr = (curr + 1) % 5;
  },
  5: (a, b) => {
    if (get(a)) {
      i[curr] = get(b);
      i[curr] -= n_params[5] + 1;
    }
  },
  6: (a, b) => {
    if (!get(a)) {
      i[curr] = get(b);
      i[curr] -= n_params[6] + 1;
    }
  },
  7: (a, b, [c]) => {
    if (get(a) < get(b)) {
      s[curr][c] = 1;
    } else {
      s[curr][c] = 0;
    }
  },
  8: (a, b, [c]) => {
    if (get(a) === get(b)) {
      s[curr][c] = 1;
    } else {
      s[curr][c] = 0;
    }
  }
};

let max = -10000;

possible_sequences(5).forEach(sequence => {
  inputOutputs = [0];
  inputPhaseSequence = sequence;
  inputFromPhaseSequence = [true, true, true, true, true];
  s = [[...orig_s], [...orig_s], [...orig_s], [...orig_s], [...orig_s]];
  i = [0, 0, 0, 0, 0];
  curr = 0;

  while (true) {
    if (s[curr][i[curr]] === 99) {
      console.log("halting", curr);
      if (curr === 4) break;
      curr += 1;
      continue;
    }

    const instruction = s[curr][i[curr]] % 100;
    const params = [];
    const orig_curr = curr;

    for (let j = 1; j <= n_params[instruction]; j++) {
      const mode = Math.floor(s[curr][i[curr]] / 10 ** (1 + j)) % 10;

      params.push([s[curr][i[curr] + j], mode]);
    }

    instructions[instruction](...params);
    i[orig_curr] += params.length + 1;
  }

  max = Math.max(max, inputOutputs.shift());
});

console.log(max);
