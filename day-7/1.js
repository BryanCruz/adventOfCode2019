"use strict";

let s =
  "3,8,1001,8,10,8,105,1,0,0,21,38,55,64,89,114,195,276,357,438,99999,3,9,101,3,9,9,102,3,9,9,1001,9,5,9,4,9,99,3,9,101,2,9,9,1002,9,3,9,101,5,9,9,4,9,99,3,9,101,3,9,9,4,9,99,3,9,1002,9,4,9,101,5,9,9,1002,9,5,9,101,5,9,9,102,3,9,9,4,9,99,3,9,101,3,9,9,1002,9,4,9,101,5,9,9,102,5,9,9,1001,9,5,9,4,9,99,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,99";

s = s.split(",").map(v => parseInt(v));
const orig_s = [...s];

const get = ([v, v_mod]) => {
  return v_mod === 0 ? s[v] : v;
};

const possible_sequences = (size, already = []) => {
  if (size === 0) {
    return [[]];
  }

  const phase_settings = [0, 1, 2, 3, 4].filter(v => already.indexOf(v) === -1);

  const possible = [];
  phase_settings.forEach(v => {
    const aux = possible_sequences(size - 1, already.concat(v));

    aux.forEach(v2 => {
      possible.push([v].concat(v2));
    });
  });

  return possible;
};

let i = 0;
let inputPhaseSequence = [];
let inputOutputs = [];
let inputFromPhaseSequence = false;

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
    s[c] = get(a) + get(b);
  },
  2: (a, b, [c]) => {
    s[c] = get(a) * get(b);
  },
  3: ([a]) => {
    if (inputFromPhaseSequence) s[a] = inputPhaseSequence.shift();
    else s[a] = inputOutputs.shift();

    inputFromPhaseSequence = !inputFromPhaseSequence;
  },
  4: a => {
    console.log(get(a));
    inputOutputs.push(get(a));
  },
  5: (a, b) => {
    if (get(a)) {
      i = get(b);
      i -= n_params[5] + 1;
    }
  },
  6: (a, b) => {
    if (!get(a)) {
      i = get(b);
      i -= n_params[6] + 1;
    }
  },
  7: (a, b, [c]) => {
    if (get(a) < get(b)) {
      s[c] = 1;
    } else {
      s[c] = 0;
    }
  },
  8: (a, b, [c]) => {
    if (get(a) === get(b)) {
      s[c] = 1;
    } else {
      s[c] = 0;
    }
  }
};

let max = -10000;

possible_sequences(5).forEach(sequence => {
  inputOutputs = [0];
  sequence.forEach(sequenceValue => {
    i = 0;
    inputFromPhaseSequence = true;
    inputPhaseSequence = [sequenceValue];
    s = [...orig_s];

    while (true) {
      if (s[i] === 99) break;

      const instruction = s[i] % 100;
      const params = [];

      for (let j = 1; j <= n_params[instruction]; j++) {
        const mode = Math.floor(s[i] / 10 ** (1 + j)) % 10;

        params.push([s[i + j], mode]);
      }

      instructions[instruction](...params);
      i += params.length + 1;
    }
  });

  max = Math.max(max, inputOutputs.shift());
});

console.log(max);
