import React, { useEffect, useState } from 'react';

export const App = () => {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const worker = new SharedWorker('./time-keeper.js', {type: 'module', name: 'Time Keeper'})
    worker.port.onmessage = ({data}) => {
      setTime(data)
    };
  }, [])

  return <div className="app">The time is: {time}</div>;
};
