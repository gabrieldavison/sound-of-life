const scaleOptions = [
  ["C4", "E4", "F#4", "A4", "B4", "C5", "E5", "F#5", "A5", "B5"],
  ["C4", "D4", "E4", "G4", "A4", "C5", "D5", "E5", "G5", "A5"],
  ["C4", "D4", "Eb4", "G4", "Bb4", "C5", "D5", "Eb5", "G5", "Bb5"],
  ["C4", "D4", "D#4", "G4", "B4", "C5", "D5", "D#5", "G5", "B5"],
  ["C4", "C#4", "E4", "G4", "B4", "C5", "C#5", "E5", "G5", "B5"],
];
let scale = scaleOptions[0];
function changeScale(number) {
  scale = scaleOptions[parseInt(number)];
  console.log(scale);
}

const synth = new Tone.PolySynth(Tone.FMSynth, {
  modulationIndex: 10,
  harmonicity: 3,
  envelope: {
    attack: 0.1,
    release: 0.5,
  },
});

var limiter = new Tone.Limiter(-5).toMaster();
var delay = new Tone.FeedbackDelay("8n", 0.9).connect(limiter);

synth.connect(delay);

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

//Delay Controls
function updateDelayTime(value) {
  delay.delayTime.value = value;
}

function updateFeedback(value) {
  delay.feedback.value = value;
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
  updateDelayTime,
  updateFeedback,
  changeScale,
};
