var screen = new Screen();

// get shared screens
screen.onaddstream = function(e) {
    document.body.appendChild(e.video);
};

// custom signaling channel
// you can use each and every signaling channel
// any websocket, socket.io, or XHR implementation
// any SIP server
// anything! etc.
screen.openSignalingChannel = function(callback) {
    return io.connect().on('message', callback);
};

// check pre-shared screens
// it is useful to auto-view
// or search pre-shared screens
// screen.check();

document.getElementById('share-screen').onclick = function() {
    screen.share();
};

// to stop sharing screen
// screen.leave();