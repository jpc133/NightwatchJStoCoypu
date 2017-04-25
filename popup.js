//Nightwatch.js to Coypu C# converts Nightmare.js to Coypu c#
// Copyright (C) 2017  Jonathan Clarke

//This program is free software; you can redistribute it and/or
//modify it under the terms of the GNU General Public License
//as published by the Free Software Foundation; either version 2
//of the License, or (at your option) any later version.

//This program is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.

//You should have received a copy of the GNU General Public License
//along with this program; if not, write to the Free Software
//Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('translateButton').onclick = translate;
});

var result = [];

function translate(){
	var codeToTranslate = document.getElementById('Pretranslation').value;
    //Do translation
	var strArray = codeToTranslate.split(/\r?\n/);
	for(x = 0; x < strArray.length; x++){
        translateLine(strArray[x])
	}
	var resultstr = "";
	for(i = 0; i < result.length; i++){
	    resultstr = resultstr + "\n" + result[i];
	}
	resultstr = resultstr.replace(/'/g,"\"");
	document.getElementById('Aftertranslation').value = resultstr;
}

function translateLine(line){
	line = String(line).replace(/`/g, "\"")
	console.log(line);
    if (String(line).search("\\burl\\b") != -1) {
        var selector = String(line).match(/"([^"]+)"/g)[0];
        var resultstr = ("browser.Visit(" + selector + ");");
        result.push(resultstr);
    }
	    if (String(line).search("\\binitNewPage\\b") != -1) {
        var selector = String(line).match(/"([^"]+)"/g)[0];
        var resultstr = ("//browser.Visit(" + selector + "); \nThread.Sleep(1000);");
        result.push(resultstr);
    }
    if (String(line).search("\\bclick\\b") != -1) {
        var selector = String(line).match(/"([^"]+)"/g)[0];
        var resultstr = ("browser.FindCss(" + selector + ").Click();");
        result.push(resultstr);
    }
    if (String(line).search("\\bchangeInput\\b") != -1) {
        var selector1 = String(line).match(/"([^"]+)"/g)[0];
        var selector2 = String(line).match(/"([^"]+)"/g)[1];
        var resultstr = ("browser.FindCss(" + selector1 + ").FillInWith(" + selector2 + ");");
        result.push(resultstr);
    }
    if (String(line).search("\\bend\\b") != -1) {
        var selector = String(line).match(/"([^"]+)"/g);
        var resultstr = ("browser.Dispose();");
        result.push(resultstr);
    }
}