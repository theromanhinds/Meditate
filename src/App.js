import './App.css';

import React from 'react';
import Meditate from './Meditate';

function App() {

    const scriptures = [
      {
        reference: "John 3:16",
        scripture: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
      },
      {
        reference: "Genesis 1:1",
        scripture: "In the beginning God created the heavens and the earth."
      },
      {
        reference: "John 15:17",
        scripture: "This is my command: Love each other."
      }
    ];

    return (
        <div className="App">
            <Meditate scriptures={scriptures}/>
        </div>
    );
}

export default App;
