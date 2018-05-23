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
var intClick = 0;
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        console.log("init")
        var clickaso = $("img");
        clickaso.click(mover);
    },

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
    generarTablero: function(){
        var table = document.querySelector("#tablero");
        for (var i = 1; i < 9; i++) {
            var tr = document.createElement('tr');
            for (var j = 1; j < 9; j++) {
                var td = document.createElement('td');
                td.setAttribute("id", "r"+i+"-c"+j);
                td.addEventListener('click',mover,false);
                td.setAttribute('row',i);
                td.setAttribute('column',j);
                if (i%2 == j%2) {
                    td.className = "white";
                } else {
                    td.className = "black";
                }
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        this.colocarKing();
    },
    colocarKing: function(){
        var invitado = localStorage.getItem('invitado');
        var email = localStorage.getItem('email');
        $.ajax({
            url:"http://localhost:8080/api/iniciarPartida",
            dataType: 'json',
            method: 'POST',
            data: { 
                'email': email ,
                'invitado' : invitado 
            },
            timeout: 5000,
            success: function(data) {
                console.log(data);
                console.log(data.pieces);
                $('body').append('<span style="display:none" colorOfPlayer="'+data.colorOfPlayer+'" gameId="'+data.game.id+'" id="datos"></span>');
                $('#r'+data.pieces[0]['row']+'-c'+data.pieces[0]['column']).append('<img id ="'+data.pieces[0]['id']+'" color="'+data.pieces[0]['color']+'" style="height:20px;width:20px" src="img/'+data.pieces[0]['color']+'.png">');
                $('#r'+data.pieces2[0]['row']+'-c'+data.pieces2[0]['column']).append('<img id ="'+data.pieces2[0]['id']+'" color="'+data.pieces2[0]['color']+'" style="height:20px;width:20px" src="img/'+data.pieces2[0]['color']+'.png">');
                
            } ,
            error: function(data) { 
                alert('Failaso we');
                console.log(data); 
            }
        });
    }
};


app.generarTablero();
app.initialize();
$('body').append('<button type="button" onclick="logout()">Logout</button>');
var firstOne = 0;
var idOrigen;
var rowOrigen;
var columnOrigen;
var idFin;
var rowOrigen;
var columnFin;

function mover(){
    if (firstOne == 0){
        if ($(this).find('img').attr('color') != $('#datos').attr('colorOfPlayer')){
            if ($(this).find('img').length){
                alert('NONE OF YOUR BUSINESS');
            }
        }else{
            idOrigen = $(this).attr('id');
            rowOrigen = $(this).attr('row');
            columnOrigen =$(this).attr('column');
            console.log('ha pasado por el primero');
            firstOne = 1;
        }
        
    } else if (firstOne == 1){
        idFin = $(this).attr('id');
        rowFin = $(this).attr('row');
        columnFin = $(this).attr('column');
        $.ajax({
            url: 'http://localhost:8080/api/mover',
            dataType: 'json',
            method: 'POST',
            data: {
                "idPartida": $('#datos').attr('gameId'),
                "idOrigen": idOrigen,
                "idFin": idFin,
                "rowOrigen": rowOrigen,
                "rowFin": rowFin,
                "columnOrigen": columnOrigen,
                "columnFin": columnFin,
                "email": localStorage.getItem('email')
            },
            type: 'post',
            success: function (response) {
                console.log(response);
            },
            error: function(data) { 
                alert('Failaso we');
                console.log(data); 
            }
        });
        console.log('ya ha pasado por el segundo');
        $('td > img').remove();
        app.colocarKing();
        firstOne = 0;
    }    
}

function logout(){
    localStorage.clear();
    $.ajax({
            data: {
                "email": localStorage.getItem('email'),
            },
            url: 'http://localhost:8080/api/logout',
            type: 'post',
            success: function (response) {
                localStorage.removeItem('token');
                window.location.href = 'http://localhost:8000/'
            }
        });
}