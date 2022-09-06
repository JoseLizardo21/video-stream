let usuario, sala;
let user = location.href.split('/');
function iniciar(){
    user = decodeURIComponent(user[5]);
    const user1 = document.getElementById('user1');
    user1.innerHTML = 'Yo';
    socket.emit('sala', sala);
    socket.on('message', recibido);
    let promesa = navigator.mediaDevices.getUserMedia({video: true});
    promesa.then(prepararcamara);
}
function prepararcamara(transmision){
    let video = document.getElementById('localmedio');
    video.srcObject = transmision;
    video.play();
    const servidores = {
        "iceServers": [
            {
                "urls": "stun:stun2.l.google.com:19302"
            }
        ]
    };
    usuario = new RTCPeerConnection(servidores);
    usuario.addStream(transmision);
    usuario.addEventListener('addstream', prepararremoto);
    usuario.addEventListener('icecandidate', prepararcandidato);
    usuario.addEventListener('negotiationneeded', negociar);
}
function negociar(){
    usuario.createOffer()
        .then((offer)=>{
            usuario.setLocalDescription(offer)
            .then(()=>{
                enviar({
                    type: "video-offer",
                    sdp: usuario.localDescription,
                });
            })
        })
}
function enviar(msg){
    const msgJSON = JSON.stringify(msg);
    socket.emit('message', {msgJSON, sala, user});
}
function recibido(e){
    const msg = JSON.parse(e);
    if(msg.type == "video-answer"){
        usuario.setRemoteDescription(new RTCSessionDescription(msg.sdp));
        return;
    }
    if (msg.type == "new-ice-candidate") {
        const candidate = new RTCIceCandidate(msg.candidate);
        usuario.addIceCandidate(candidate)
            .catch(()=>{console.log("error")})
        return;
    }
    const des = new RTCSessionDescription(msg.sdp);
    usuario.setRemoteDescription(des)
        .then(()=>{
            usuario.createAnswer()
            .then((answer)=>{
                usuario.setLocalDescription(answer)
                .then(()=>{
                    const msg = {
                        type: "video-answer",
                        sdp: usuario.localDescription,
                    }
                    enviar(msg);
                });
            });
        })
        
}
function prepararcandidato(e){
    if(e.candidate){
        enviar({
            type: "new-ice-candidate",
            candidate: e.candidate,
        })
    }
}
function prepararremoto(e){
    const video = document.getElementById('remotomedio');
    const user2 = document.getElementById('user2');
    socket.on('user', (user)=>{
        user2.innerHTML = user;
    });
    video.srcObject = e.stream;
    video.play();
}
window.addEventListener("load", iniciar);