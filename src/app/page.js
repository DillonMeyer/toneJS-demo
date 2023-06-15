"use client";
import React, { useRef, useState } from 'react';
import * as Tone from 'tone'
import styles from './page.module.css'
import PlayCircle from './PlayCircle'
import StopCircle from './StopCircle'
import Power from './Power'
import Arrows from './Arrows'

export default function Home() {

  const FXPad = useRef(null);
  let start
  let play
  let stop
  let updateBPM
  let updateFX

  if (typeof window !== "undefined"){

    start = async () => {
      await Tone.start();
    }
    
    play = async () => {
      await Tone.Transport.start("+0.1");
    }
    
    stop = () => {
      Tone.Transport.stop();
    }
  
  var chordsSynth = new Tone.PolySynth(Tone.Synth, {
    "oscillator" : {
      "type" : "sine",
      "count" : 3,
      "spread" : 30
    },
    "envelope": {
      "attack": 0.01,
      "decay": 0.1,
      "sustain": 0.5,
      "release": 0.4,
      "attackCurve" : "exponential"
    },
  }).toDestination()
  chordsSynth.volume.value = 0
  
  var synth = new Tone.PolySynth(Tone.Synth, {
    "oscillator" : {
      "type" : "square",
      "count" : 3,
      "spread" : 30
    },
    "envelope": {
      "attack": 0.01,
      "decay": 0.1,
      "sustain": 0.5,
      "release": 0.4,
      "attackCurve" : "exponential"
    },
  })
  synth.volume.value = -5
  
  const snare = new Tone.MetalSynth({
    frequency: 1000, // Initial frequency of the metal sound
    envelope: {
      attack: 0.001, // Attack time in seconds
      decay: 0.1, // Decay time in seconds
      release: 0.1 // Release time in seconds
    },
    harmonicity: 5.1, // Harmonicity value
    modulationIndex: 32, // Modulation index value
    resonance: 800, // Resonance value
    octaves: 2.5 // Octave value
  }).toDestination();
  snare.volume.value = 0
  
  const kick = new Tone.MembraneSynth().toDestination();
  kick.volume.value = 0
  
  const hat = new Tone.MetalSynth({
    frequency: 1500, // Initial frequency of the metal sound
    envelope: {
      attack: 0.001, // Attack time in seconds
      decay: 0.1, // Decay time in seconds
      release: 0.5 // Release time in seconds
    },
    harmonicity: 5.1, // Harmonicity value
    modulationIndex: 32, // Modulation index value
    resonance: 8000, // Resonance value
    octaves: 1.5 // Octave value
  }).toDestination();
  hat.volume.value = -3
  
  const vibrato = new Tone.Vibrato(5, 0)
  // const reverb = new Tone.Reverb(1)
  const reverb = new Tone.JCReverb(.2)
  const tremolo = new Tone.Tremolo(25, 1)
  const pingPong = new Tone.PingPongDelay("50hz", 0.2)
  // const autoWah = new Tone.AutoWah(50, 6, -30)
  // autoWah.Q.value = 1;
  // autoWah.sensitivity = 1;
  
  synth.chain(vibrato, pingPong, reverb, Tone.Destination);
  // synth.chain(Tone.Destination); // no FX
  
  // const metronome = new Tone.Part(((time, value) => {
  // 	synth.triggerAttackRelease(value.note, "16n", time, value.velocity);
  // }), [
  //   { time: 0, note: "C4", velocity: 0.5 },
  //   { time: "0:1", note: "C4", velocity: 0.5 },
  //   { time: "0:2", note: "C4", velocity: 0.5 },
  //   { time: "0:3", note: "C4", velocity: 0.5 }
  // ]).start(0)
  
  /* ocatave down
  // const melodyPart = new Tone.Part(((time, value) => {
  // 	synth.triggerAttackRelease(value.note, "16n", time, value.velocity);
  // }), [
  //   { time: 0, note: "E5", velocity: 0.7 },
  //   { time: "0:0:3", note: "E5", velocity: 0.7 },
  //   { time: "0:1:1", note: "D5", velocity: 0.7 },
  //   { time: "0:3:0", note: "G4", velocity: 0.7 },
  //   { time: "0:3:1", note: "A4", velocity: 0.7 },
  //   { time: "0:3:2", note: "C4", velocity: 0.7 },
  //   { time: "0:3:3", note: "A4", velocity: 0.7 },
  //   { time: "1:0", note: "D5", velocity: 0.7 },
  //   { time: "1:0:3", note: "D5", velocity: 0.7 },
  //   { time: "1:1:1", note: "C5", velocity: 0.7 },
  //   { time: "1:3:0", note: "G4", velocity: 0.7 },
  //   { time: "1:3:1", note: "A4", velocity: 0.7 },
  //   { time: "1:3:2", note: "C4", velocity: 0.7 },
  //   { time: "1:3:3", note: "A4", velocity: 0.7 },
  //   { time: "2:0", note: "C5", velocity: 0.7 },
  //   { time: "2:0:3", note: "D5", velocity: 0.7 },
  //   { time: "2:1:1", note: "B4", velocity: 0.7 },
  //   { time: "2:2:0", note: "A4", velocity: 0.7 },
  //   { time: "2:2:1", note: "G4", velocity: 0.7 },
  //   { time: "2:3:2", note: "G4", velocity: 0.7 },
  //   { time: "3:0", note: "D5", velocity: 0.7 },
  //   { time: "3:1", note: "C5", velocity: 0.7 },
  //   { time: "3:3:0", note: "G4", velocity: 0.7 },
  //   { time: "3:3:1", note: "A4", velocity: 0.7 },
  //   { time: "3:3:2", note: "C4", velocity: 0.7 },
  //   { time: "3:3:3", note: "A4", velocity: 0.7 },
  // ]).start(0)
  */
  
  const melodyPart = new Tone.Part(((time, value) => {
    synth.triggerAttackRelease(value.note, "16n", time, value.velocity);
  }), [
    { time: 0, note: "E4", velocity: 0.7 },
    { time: "0:0:3", note: "E4", velocity: 0.7 },
    { time: "0:1:1", note: "D4", velocity: 0.7 },
    { time: "0:3:0", note: "G3", velocity: 0.7 },
    { time: "0:3:1", note: "A3", velocity: 0.7 },
    { time: "0:3:2", note: "C3", velocity: 0.7 },
    { time: "0:3:3", note: "A3", velocity: 0.7 },
    { time: "1:0", note: "D4", velocity: 0.7 },
    { time: "1:0:3", note: "D4", velocity: 0.7 },
    { time: "1:1:1", note: "C4", velocity: 0.7 },
    { time: "1:3:0", note: "G3", velocity: 0.7 },
    { time: "1:3:1", note: "A3", velocity: 0.7 },
    { time: "1:3:2", note: "C3", velocity: 0.7 },
    { time: "1:3:3", note: "A3", velocity: 0.7 },
    { time: "2:0", note: "C4", velocity: 0.7 },
    { time: "2:0:3", note: "D4", velocity: 0.7 },
    { time: "2:1:1", note: "B3", velocity: 0.7 },
    { time: "2:2:0", note: "A3", velocity: 0.7 },
    { time: "2:2:1", note: "G3", velocity: 0.7 },
    { time: "2:3:2", note: "G3", velocity: 0.7 },
    { time: "3:0", note: "D4", velocity: 0.7 },
    { time: "3:1", note: "C4", velocity: 0.7 },
    { time: "3:3:0", note: "G3", velocity: 0.7 },
    { time: "3:3:1", note: "A3", velocity: 0.7 },
    { time: "3:3:2", note: "C3", velocity: 0.7 },
    { time: "3:3:3", note: "A3", velocity: 0.7 },
    { time: "4:0", note: "E4", velocity: 0.7 },
    { time: "4:0:3", note: "E4", velocity: 0.7 },
    { time: "4:1:1", note: "D4", velocity: 0.7 },
    { time: "4:3:0", note: "G3", velocity: 0.7 },
    { time: "4:3:1", note: "A3", velocity: 0.7 },
    { time: "4:3:2", note: "C3", velocity: 0.7 },
    { time: "4:3:3", note: "A3", velocity: 0.7 },
    { time: "5:0", note: "G4", velocity: 0.7 },
    { time: "5:0:3", note: "B3", velocity: 0.7 },
    { time: "5:1:1", note: "C4", velocity: 0.7 },
    { time: "5:3:0", note: "G3", velocity: 0.7 },
    { time: "5:3:1", note: "A3", velocity: 0.7 },
    { time: "5:3:2", note: "C3", velocity: 0.7 },
    { time: "5:3:3", note: "A3", velocity: 0.7 },
    { time: "6:0", note: "C4", velocity: 0.7 },
    { time: "6:0:3", note: "D4", velocity: 0.7 },
    { time: "6:1:1", note: "B3", velocity: 0.7 },
    { time: "6:2:0", note: "A3", velocity: 0.7 },
    { time: "6:2:1", note: "G3", velocity: 0.7 },
    { time: "6:3:2", note: "G3", velocity: 0.7 },
    { time: "7:0", note: "D4", velocity: 0.7 },
    { time: "7:1", note: "C4", velocity: 0.7 },
    { time: "7:3:0", note: "G3", velocity: 0.7 },
    { time: "7:3:1", note: "A3", velocity: 0.7 },
    { time: "7:3:2", note: "C3", velocity: 0.7 },
    { time: "7:3:3", note: "A3", velocity: 0.7 },
  ]).start(0)
  
  const chordsPart = new Tone.Part(((time, value) => {
    chordsSynth.triggerAttackRelease(value.note, "4n", time, value.velocity);
  }), [
    { time: 0, note: ["F3", "A3", "C3"], velocity: 0.3 }, // F
    { time: "0:2:2", note: ["G3", "B3", "D3"], velocity: 0.3 }, // G
    { time: "1:0", note: ["G3", "B3", "E3"], velocity: 0.3 }, // Em
    { time: "1:2:2", note: ["A3", "C3", "E3"], velocity: 0.3 }, // Am
    { time: "2:0", note: ["F3", "A3", "C3"], velocity: 0.3 },
    { time: "2:2:2", note: ["G3", "B3", "D3"], velocity: 0.3 },
    { time: "3:0", note: ["G3", "B3", "E3"], velocity: 0.3 },
    { time: "3:1", note: ["A3", "C3", "E3"], velocity: 0.3 }
  ]).start(0)
  
  const snarePart = new Tone.Part(((time, value) => {
    snare.triggerAttackRelease(value.note, "16n", time, value.velocity);
  }), [
    { time: "0:1", note: "C4", velocity: 0.5 },
    { time: "0:3", note: "C4", velocity: 0.5 },
    { time: "1:1", note: "C4", velocity: 0.5 },
    { time: "1:3", note: "C4", velocity: 0.5 },
    { time: "2:1", note: "C4", velocity: 0.5 },
    { time: "2:3", note: "C4", velocity: 0.5 },
    { time: "3:1", note: "C4", velocity: 0.5 },
    { time: "3:2:1", note: "C4", velocity: 0.5 },
    { time: "3:3", note: "C4", velocity: 0.5 },
    { time: "3:3:2", note: "C4", velocity: 0.5 },
    { time: "3:3:3", note: "C4", velocity: 0.5 },
  ]).start(0)
  
  const kickPart = new Tone.Part(((time, value) => {
    kick.triggerAttackRelease(value.note, "16n", time, value.velocity);
  }), [
    { time: 0, note: "C2", velocity: 0.5 },
    { time: "0:2", note: "C2", velocity: 0.5 },
  ]).start(0)
  
  const hatPart = new Tone.Part(((time, value) => {
    hat.triggerAttackRelease(value.note, "16n", time, value.velocity);
  }), [
    { time: 0, note: "C2", velocity: 0.5 },
    { time: "0:0:1", note: "C2", velocity: 0.5 },
    { time: "0:0:2", note: "C2", velocity: 0.5 },
    { time: "0:0:3", note: "C2", velocity: 0.5 },
  ]).start(0)
  
  // metronome.loop = true;
  // metronome.loopEnd = "1m";
  
  chordsPart.loop = true;
  chordsPart.loopEnd = "4m";
  
  melodyPart.loop = true;
  melodyPart.loopEnd = "8m";
  
  snarePart.loop = true;
  snarePart.loopEnd = "4m";
  
  kickPart.loop = true;
  kickPart.loopEnd = "1m";
  
  hatPart.loop = true;
  hatPart.loopEnd = "4n";
  
  Tone.Transport.bpm.value = 120;
  
  updateBPM = (bpm) => {
    Tone.Transport.stop();
    Tone.Transport.bpm.value = bpm;
  }
  
  updateFX = (event) => {
    
    var e = window.event;
  
    const bounds = FXPad.current.getBoundingClientRect();
    const posX = e.clientX - bounds.left;
    const posY = e.clientY - bounds.top;
  
    // Adjust the tremolo speed based on the X position
    // const tremoloSpeed = posX / bounds.width * 20; // Map X position to a range of 0 to 20
    // tremolo.frequency.value = tremoloSpeed;
  
    // Adjust the vibrato depth based on the Y position
    // const vibratoDepth = posY / bounds.height * 1 < 0 ? 0 : posY / bounds.height * 1; // Map Y position to a range of 0 to 1
    // vibrato.depth.value = vibratoDepth;
  
    // const vibratoSpeed = posX / bounds.width * 20; // Map X position to a range of 0 to 20
    // vibrato.frequency.value = vibratoSpeed;
    
    // Adjust the filter frequency based on the Y position
    // const filterFrequency = posY / bounds.height * 20000; // Map Y position to a range of 0 to 20000
    // filter.frequency.value = filterFrequency;
  
    // const filterResonance = posY / bounds.height * 30; // Map Y position to a range of 0 to 30
    // filter.Q.value = filterResonance;
  
    // const autoWahFrequency = posX / bounds.width * 1000 + 100; // Map X position to a range of 100 to 1100
    // autoWah.baseFrequency = autoWahFrequency;
  
    // const autoWahQ = posX / bounds.width * 20; // Map X position to a range of 0 to 20
    // autoWah.Q.value = autoWahQ;
  
    reverb.roomSize.input.value = posX / bounds.height * 1 < 0 ? 0 : posX / bounds.height * 1;
    reverb.wet.input.value = posX / bounds.height * 1 < 0 ? 0 : posX / bounds.height * 1;
  
    // pingPong.feedback.value = posX / bounds.height * 1 < 0 ? 0 : posX / bounds.height * 1; // Map Y position to a range of 0 to 1
    pingPong.wet.value = posY / bounds.height * 1 < 0 ? 0 : posY / bounds.height * 1; // Map Y position to a range of 0 to 1
    pingPong.delayTime.value = posY / bounds.height * 1 < 0 ? `${0}hz` : `${posY / bounds.height * 1}hz`; // Map Y position to a range of 0 to 1
  }
  }


  return (
    <main className={styles.main}>
        <div className={styles.popUp}>
          <p className={styles.txt}>This is just a simple example of some basic Tone.js functionality.</p>
          <p className={styles.txt}>There are bugs and cosmetic imperfections.</p>
          <p className={styles.txt}><span className={styles.txtSpan}>Start at a low volume, don't use headphones,</span> and if the effects become too loud (which can easily happen) reload the page to kill the process.</p>
          <p className={styles.txt}>To start click the power button and press play.</p>
          <p className={styles.txt}>Delay and reverb parameters can be modulated by moving your mouse over the orange pad.</p>
          {/* <button className={styles.btn} onClick={() => setConfirmPopup(true)}>Okay</button> */}
        </div>

      <div className={styles.wrapper}>

        <input type="number" placeholder={"120 BPM"} className={styles.inputBPM} onChange={(e) => updateBPM(e.target.value)} />

        <div onClick={() => {
          typeof start !== undefined ? start() : ""
        }} className={styles.power}>
          <Power />
        </div>

      <div className={styles.controlsContainer}>
        <div onClick={() => {
          typeof play !== undefined ? play() : ""
        }} className={styles.play}>
          <PlayCircle />
        </div>

        <div onClick={() => {
          typeof stop !== undefined ? stop() : ""
        }} className={styles.stop}>
          <StopCircle />
        </div>
      </div>

        <div className={styles.FXPad} ref={FXPad} onMouseMove={(e) => updateFX(e.target.value)}>
          <div className={styles.arrows}>
            <Arrows color='#c59f3f' />
          </div>
        </div>
      
      </div>

    </main>
  )
}
