/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        
    },
    /*
    {
    "playerLogged": {
        "email": "jose@cornellapp.cat"
    },
    "players": [
        {
            "id": 2,
            "name": "Otro",
            "email": "otro@cornellapp.cat",
            "tokensuelo": "0",
            "status": 0,
            "created_at": "2018-04-23 16:05:59",
            "updated_at": "2018-04-23 16:05:59"
        }
    ]
}   */
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        /*var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        */
        console.log('Received Event: ' + id);
    },
    generarTablero: function(playerLogged, players){
        var email = localStorage.getItem('email');
        $.ajax({
            url:"http://localhost:8080/api/buscarJugadores",
            dataType: 'json',
            method: 'POST',
            data: { 'email': email },
            timeout: 5000,
            success: function(data) {
                console.log(data);
                console.log(data.players.length)
                for (var i = 0 ; i < data.players.length ; i++){
                    $('#tableroide').append('<tr><td name="'+data.players[i]['id']+'" id="user'+i+'">'+data.players[i]['name']+'</td><td>'+data.players[i]['email']+'</td></tr>');
                    $('#user'+ i).click(function(e){
                        var x = e.target.getAttribute("name");
                        localStorage.setItem("invitado",x);
                        window.location.href = "partida.html"
                    });
                }
                
                $('#tableroide2').append('<tr><td>'+data.playerLogged['email']+'</td></tr>');
            } ,
            error: function(data) { 
                alert('Email o contraseña incorrecta'); 
            }
        });
        $.ajax({
            url:"http://localhost:8080/api/buscarJugadoresDos",
            dataType: 'json',
            method: 'POST',
            data: { 'email': email },
            timeout: 5000,
            success: function(data) {
                console.log(data);
                if (data.gamePlaying != null){
                    console.log('ueba');
                    $('#tableroide3').append('<tr><td name="'+data.gamePlaying['id']+'" id="game'+data.gamePlaying['id']+'">juego</td></tr>');
                    $('#game'+data.gamePlaying['id']).click(function(e){
                        window.location.href = "partida.html"
                    });
                    $('#tableroide').hide();
                }else{
                    $('#tableroide3').hide();
                }
                
            } ,
            error: function(data) { 
                alert('Email o contraseña incorrecta'); 
            }
        });
    }
};

app.generarTablero();
app.initialize();

