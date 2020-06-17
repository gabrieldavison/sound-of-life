const scale = ["C4", "E4", "F#4", "A4", "B4", "C5", "E5", "F#5", "A5", "B5"];

const synth = new Tone.PolySynth(4, Tone.FMSynth, {
  modulationIndex: 10,
  harmonicity: 3,
  envelope: {
    attack: 0.1,
    release: 0.5,
  },
});

var limiter = new Tone.Limiter(-3).toMaster();
var delay = new Tone.FeedbackDelay("8n", 0.9).connect(limiter);

synth.connect(delay);
function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}
//Synthesizer Controls
function updateAttack(value) {
  const floatValue = parseFloat(value);
  synth.set("envelope", { attack: floatValue });
}
function updateRelease(value) {
  const floatValue = parseFloat(value);
  console.log(floatValue);
  synth.set("envelope", { release: floatValue });
}
function updateHarmonicity(value) {
  synth.set({ harmonicity: [value] });
}
function updateModIndex(value) {
  synth.set({ modulationIndex: [value] });
}

function playStep(notes) {
  const noteIndex = notes.indexOf(Math.max(...notes));

  synth.triggerAttackRelease(scale[noteIndex], "10n");
}

export {
  playStep,
  updateModIndex,
  updateAttack,
  updateRelease,
  updateHarmonicity,
};
