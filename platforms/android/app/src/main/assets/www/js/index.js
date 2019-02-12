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
var mapimg = new Image();
var db;  
const CWIDTH = 507;
const CHEIGHT = 330;


var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        //window.plugins.sqlDB.copy("YumaApp.db", 0, app.dbsuccess, app.dbfail);
        this.setImg();
        //load image to canvas when they click on the QMD button
		document.getElementById("maplink").addEventListener("click", this.loadImage);
        document.getElementById("canvas1").addEventListener("click", function(e) {
            if(mapimg.src = "img/park_ldpi.jpg") {
                app.getBuilding(e.pageX, e.pageY);
            } else {
                app.getBuilding(e.pageX/1.95, e.pageY/1.95);
            }
            window.location = "#page3";
        });
        window.addEventListener("orientationchange"), function(){
            this.setImg
        };
    },

    dbsuccess: function() {
        //alert("copy success");
        db = window.sqlitePlugin.openDatabase({name:"YumaApp.db", location: "default"});
    },

    dbfail: function(err) {
        if(e.code == 516) {
            db = window.sqlitePlugin.openDatabase({name:"YumaApp.db", location: "default"});
        } else {
            alert(e.message);
        }
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
       
        console.log('Received Event: ' + id);
    },

    loadImage: function() {
        var ctx = document.getElementById("canvas1").getContext("2d");
        ctx.drawImage(mapimg, 0, 0, CWIDTH, CHEIGHT);
        screen.orientation.lock("landscape");
    },

    setImg: function() {
        console.log("img");
        if (window.innerWidth >= 940) {
            mapimg.src = "img/park_hdpi.jpg";
        } else {
            mapimg.src = "img/park_ldpi.jpg";
        }
    },

    getBuilding:function(x, y) {

        this.sql = "SELECT * FROM buildings WHERE id=";

        if (x >= 84 && x <= 124 && y >=228 && y <=279) {
            this.sql += "1";
            document.getElementById("pagename").innerText = "Info Center";
            document.getElementById("p3img").src = "img/vic.jpg";
        }else if (x >= 191 && x <= 267 && y >= 98 && y <= 190){
           this.sql += "2";
           document.getElementById("pagename").innerText = "Storehouse";
           document.getElementById("p3img").src = "img/storehouse.jpg";
        }else if (x >= 283 && x <= 373 && y >= 99 && y <= 147){
            this.sql += "3";   
            document.getElementById("pagename").innerText = "Quartermaster's Office";
            document.getElementById("p3img").src = "img/qmo.jpg";
        }else if (x >= 404 && x <= 467 && y >= 46 && y <= 106){
            this.sql += "4";   
            document.getElementById("pagename").innerText = "Quartermaster's House & Kitchen";
            document.getElementById("p3img").src = "img/kitchen.jpg";
        }else if (x >= 142 && x <= 272 && y >= 258 && y <= 332){
            this.sql += "5";   
            document.getElementById("pagename").innerText = "Corral House";
            document.getElementById("p3img").src = "img/ch.jpg";
        }else if (x >= 292 && x <= 330 && y >= 31 && y <= 69){
            this.sql += "6";   
            document.getElementById("pagename").innerText = "Resevoir";
            document.getElementById("p3img").src = "img/river.jpg";
        }else if (x >= 127 && x <= 173 && y >= 87 && y <= 147){
            this.sql += "7";   
            document.getElementById("pagename").innerText = "Passenger Car";
            document.getElementById("p3img").src = "img/pscar.jpg";   
        } else {
            this.sql += "8";
            document.getElementById("pagename").innerText = "Scenic Park Lawn or Walkway";
            document.getElementById("p3img").src = "img/lawn.jpg";
        }
        //db.transaction(this.getSql, this.errData, app.showData);
        console.log(x + "-" + y)
    },

    getSql: function(tx) {
        tx.executeSql(app.sql, [], app.showData, app.errData);
    },

    showData: function(tx,result){
        document.getElementById("p3img").src = "img/" + result.rows.item(0).imgname;
        document.getElementById("p3text").innerText = result.rows.item(0).description;
        document.getElementById("pagename").innerText = result.rows.item(0).title;
    },

    errData: function(err) {
        alert("error:" + err.message + ":" + err.code);
    }

 

};

app.initialize();