import React, { useState, useEffect } from 'react';

const AudioVisualization = ({ playing, onAverageAmplitude }) => {
  let audioContext;
  let analyser;
  let animationFrameId;

  const startVisualization = () => {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.9;

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        let source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.connect(audioContext.destination);

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const updateAudioData = () => {
          analyser.getByteFrequencyData(dataArray);
          let ampSum = dataArray.reduce((sum, value) => sum + value, 0);
          const avgAmp = ampSum / bufferLength;
          onAverageAmplitude(avgAmp);

          animationFrameId = requestAnimationFrame(updateAudioData);
        };

        updateAudioData();
      });
  };

  const stopVisualization = () => {
    if (audioContext) {
      audioContext.close();
    }
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
  };

  useEffect(() => {
    if (playing) {
      startVisualization();
    } else {
      stopVisualization();
    }

    return () => {
      stopVisualization();
    };
  }, [playing, onAverageAmplitude]);

  return null;
};

export default AudioVisualization;
