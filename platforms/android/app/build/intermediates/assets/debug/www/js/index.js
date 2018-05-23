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
                td.setAttribute("id", "r"+i+"c"+j);
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
        $('#r1c5').append('<img style="height:20px;width:20px" src="img/king.png">');
        $('#r8c5').append('<img style="height:20px;width:20px" src="img/king.png">')
    }
};
    
app.generarTablero();
app.initialize();