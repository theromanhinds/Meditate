import { useState, useRef } from 'react';
import axios from 'axios';

const useAudioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState('');
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const startRecording = async () => {
        setTranscription('');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            audioChunksRef.current = [];
            const transcriptionText = await transcribeAudio(audioBlob);
            setTranscription(transcriptionText);
        };

        mediaRecorder.start(2000);
        setIsRecording(true);
    };

    const stopRecording = async () => {
        return new Promise((resolve) => {
            mediaRecorderRef.current.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                audioChunksRef.current = [];
                const transcriptionText = await transcribeAudio(audioBlob);
                setTranscription(transcriptionText);
                resolve(audioBlob);  // Return audioBlob after transcription
            };
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        });
    };

    const transcribeAudio = async (audioBlob) => {
        const formData = new FormData();
        formData.append('file', audioBlob);
        formData.append('model', 'whisper-1');

        try {
            const response = await axios.post(
                'https://api.openai.com/v1/audio/transcriptions',
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data.text;
        } catch (error) {
            console.error('Error transcribing audio:', error);
            return 'Error transcribing audio.';
        }
    };

    return { isRecording, transcription, startRecording, stopRecording };
};

export default useAudioRecorder;
