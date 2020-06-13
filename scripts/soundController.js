const scale = ["C4", "E4", "F#4", "A4", "B4", "C5", "E5", "F#5", "A5", "B5"];

const voice1 = new Tone.PolySynth(4, Tone.FMSynth);
const voice2 = new Tone.PolySynth(4, Tone.FMSynth);
const voice3 = new Tone.PolySynth(4, Tone.FMSynth);
const voice4 = new Tone.PolySynth(4, Tone.FMSynth);
const voice5 = new Tone.PolySynth(4, Tone.FMSynth);

var limiter = new Tone.Limiter(-3).toMaster();
var delay = new Tone.FeedbackDelay("8n", 0.9).connect(limiter);

const voices = [voice1, voice2, voice3, voice4, voice5];
for (let i = 0; i < voices.length; i++) {
  voices[i].connect(delay);
}

function playStep(notes) {
  const noteIndex = notes.indexOf(Math.max(...notes));

  voices[0].triggerAttackRelease(scale[noteIndex], "10n");
  // for (let i = 0; i < notes.length; i++) {

  //   voices[i].triggerAttackRelease(scale[noteIndex], "8n");
  // }
}

export { playStep };
