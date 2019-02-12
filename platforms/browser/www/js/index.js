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
        window.plugins.sqlDB.copy("YumaApp.db", 0, app.dbsuccess, app.dbfail);
        mapimg.src =  window.innerWidth >= 940 ? "img/park_hdpi.jpg" : "img/park_ldpi.jpg";
        //load image to canvas when they click on the QMD button
		document.getElementById("maplink").addEventListener("click", this.loadImage);
        document.getElementById("canvas1").addEventListener("click", function(e) {
            console.log(e.pageY);
            //app.getBuilding(e.pageX, e.pageY);
            alert(e.pageX + "-" + e.pageY)
            window.location = "#page3";
        })
    },

    dbsuccess: function() {
        alert("copy success");
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

    getBuilding:function(x, y) {
        this.sql = "SELECT * FROM buildings WHERE id=";
        //calculate which building based on the coordinates
        if (y > CHEIGHT / 2) {
            this.sql += "1";
        }else if (x < CWIDTH / 2){
           this.sql += "2";      
        } else {
            this.sql += "3";
        }
        alert(this.sql);
        db.transaction(this.getSql, this.errData, app.showData);
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