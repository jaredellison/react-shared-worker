const getTime = (cb) => {
  let lastTime = Date().toString();
  while(true) {
    const now = new Date();
    if (now.toString() !== lastTime && (now.getSeconds() % 2 == 0)) {
      cb(now.toString());
      lastTime = now.toString();
    }
  }
}


export default (() => {
  self.onconnect = (e) => {
    const port = e.ports[0];
    getTime((time) => {
      port.postMessage(time);
    });
    port.start();
  };
})()
