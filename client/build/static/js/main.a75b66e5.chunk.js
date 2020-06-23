(this.webpackJsonpscoreboard=this.webpackJsonpscoreboard||[]).push([[0],[,,,,,,,,,,function(e,a,t){e.exports=t.p+"static/media/bg.5ded9239.jpg"},function(e,a,t){e.exports=t.p+"static/media/bg-win.5ded9239.jpg"},,function(e,a,t){e.exports=t(21)},,,,,function(e,a,t){},function(e,a,t){},,function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),s=t(9),i=t.n(s),o=(t(18),t(7)),c=t(12),l=(t(19),t(1)),m=t(2),u=t(4),p=t(3),h=function(e){Object(u.a)(t,e);var a=Object(p.a)(t);function t(e){var n;return Object(l.a)(this,t),(n=a.call(this,e)).state={time:(new Date).toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:!0})},n}return Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.intervalID=setInterval((function(){return e.tick()}),1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.intervalID)}},{key:"tick",value:function(){this.setState({time:(new Date).toLocaleString("en-US",{hour:"numeric",minute:"numeric",hour12:!0}).split(" ").join("")})}},{key:"render",value:function(){return r.a.createElement("p",{className:"clock"},this.state.time)}}]),t}(r.a.Component),v=t(5),y=t.n(v),g=t(6),d="/api/hello",f="/api/submit-game",w="/api/get-players",b="102nf238971",S=function(){var e=Object(g.a)(y.a.mark((function e(){var a,t;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(d);case 2:return a=e.sent,e.next=5,a.json();case 5:if(t=e.sent,200===a.status){e.next=8;break}throw Error(t.message);case 8:return e.abrupt("return",t.msg);case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(){var e=Object(g.a)(y.a.mark((function e(a){var t,n;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.token=b,e.next=3,fetch(f,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});case 3:return t=e.sent,e.next=6,t.json();case 6:if(n=e.sent,200===t.status){e.next=9;break}throw Error(n.message);case 9:return e.abrupt("return",n.message);case 10:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),E=function(){var e=Object(g.a)(y.a.mark((function e(){var a,t,n;return y.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={token:b},e.next=3,fetch(w,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});case 3:if(!(t=e.sent).ok){e.next=13;break}return e.next=7,t.json();case 7:if(n=e.sent,200===t.status){e.next=10;break}throw Error(n.message);case 10:return e.abrupt("return",n.players);case 13:throw Error(t.statusText);case 14:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=function(e){Object(u.a)(t,e);var a=Object(p.a)(t);function t(e){var n;return Object(l.a)(this,t),(n=a.call(this,e)).state={gameMode:"standard",gameState:"setup",availablePlayers:[],serverStatus:"CANNOT CONNECT TO API",players:{home:{id:"",name:"",isServing:!0},away:{id:"",name:"",isServing:!1}}},n}return Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this,a=this.state;S().then((function(t){a.serverStatus=t,E().then((function(t){a.availablePlayers=t,a.players.home.id=t[0].player_id,a.players.home.name=t[0].name;var n=t.length-1;a.players.away.id=t[n].player_id,a.players.away.name=t[n].name,e.setState(a)}))}))}},{key:"onHomeChange",value:function(e){var a=this.state,t=e.target.selectedIndex;a.players.home.id=e.target.options[t].value,a.players.home.name=e.target.options[t].text,this.setState(a)}},{key:"onAwayChange",value:function(e){var a=this.state,t=e.target.selectedIndex;a.players.away.id=e.target.options[t].value,a.players.away.name=e.target.options[t].text,this.setState(a)}},{key:"onServingChange",value:function(e){var a=this.state;"home"===e.target.value?(a.players.home.isServing=!0,a.players.away.isServing=!1):"away"===e.target.value&&(a.players.home.isServing=!1,a.players.away.isServing=!0),this.setState(a)}},{key:"toggleServing",value:function(e){var a=this.state;a.players.home.isServing=!a.players.home.isServing,a.players.away.isServing=!a.players.away.isServing,this.setState(a)}},{key:"startGame",value:function(){var e=this.state;this.props.startGame({gameMode:e.gameMode,gameState:"playing",players:{home:{id:e.players.home.id,name:e.players.home.name,isServing:e.players.home.isServing},away:{id:e.players.away.id,name:e.players.away.name,isServing:e.players.away.isServing}}})}},{key:"setPracticeMode",value:function(){var e=this.state;e.gameMode="practice",e.players.home.name="Home",e.players.home.id="",e.players.away.name="Away",e.players.away.id="",this.setState(e),this.startGame()}},{key:"render",value:function(){var e=this,a="Connected to API"===this.state.serverStatus;return r.a.createElement("div",{className:"setup"},r.a.createElement("h1",{className:"setup__header"},"Big Vision"),r.a.createElement("h2",{className:"setup__subheader"},"Table Tennis League"),r.a.createElement("div",{className:"setup__players"},r.a.createElement("div",{className:"setup__player setup__player--home"},0!==this.state.availablePlayers.length?r.a.createElement("select",{id:"home-player",onChange:this.onHomeChange.bind(this)},this.state.availablePlayers.map((function(e){return r.a.createElement("option",{key:e.player_id,value:e.player_id},e.name)}))):"No players available"),r.a.createElement("h2",{className:"setup__vs"},"VS"),r.a.createElement("div",{className:"setup__player setup__player--away"},0!==this.state.availablePlayers.length?r.a.createElement("select",{id:"away-player",onChange:this.onAwayChange.bind(this)},this.state.availablePlayers.map((function(a){return e.state.players.home.id!==a.player_id?r.a.createElement("option",{key:a.player_id,value:a.player_id},a.name):""}))):"No players available")),r.a.createElement("div",{className:"setup__serving \n\t\t\t\t\t\t\t\t\t\t".concat(!0===this.state.players.home.isServing?"setup__serving--home":"setup__serving--away")},r.a.createElement("div",{className:"setup__serving-container"},!0===this.state.players.away.isServing?r.a.createElement("button",{className:"setup__serving-button",onClick:this.toggleServing.bind(this)},"< ",r.a.createElement("h3",{className:"setup__serving-header"},"First Serve")):"",!0===this.state.players.home.isServing?r.a.createElement("button",{className:"setup__serving-button",onClick:this.toggleServing.bind(this)},r.a.createElement("h3",{className:"setup__serving-header"},"First Serve"),">"):"")),r.a.createElement("div",{className:"setup__buttons"},r.a.createElement("button",{className:"setup__btn-start btn-main",onClick:this.startGame.bind(this)},"Begin Match"),r.a.createElement("button",{className:"setup__btn-practice btn-hollow",onClick:this.setPracticeMode.bind(this)},"Practice Game")),r.a.createElement("p",{className:"setup__server\n\t\t\t\t\t\t".concat(a?"":"error-msg","\n\t\t\t\t\t")},this.state.serverStatus))}}]),t}(r.a.Component),O=function(e){Object(u.a)(t,e);var a=Object(p.a)(t);function t(){return Object(l.a)(this,t),a.apply(this,arguments)}return Object(m.a)(t,[{key:"render",value:function(){return r.a.createElement("div",{className:"scoreboard__card"},r.a.createElement("div",{className:"scoreboard__score"},this.props.score),r.a.createElement("div",{className:"scoreboard__name ".concat(this.props.isServing?"scoreboard__name--serving":"")},this.props.name))}}]),t}(r.a.Component);function N(){return(N=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e}).apply(this,arguments)}function j(e,a){if(null==e)return{};var t,n,r=function(e,a){if(null==e)return{};var t,n,r={},s=Object.keys(e);for(n=0;n<s.length;n++)t=s[n],a.indexOf(t)>=0||(r[t]=e[t]);return r}(e,a);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(n=0;n<s.length;n++)t=s[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var C=r.a.createElement("path",{d:"M69.1193 12.8906L61.6329 42.5971H60.3728L52.8864 12.8906H40.9897L50.2921 49.783C50.9222 52.3388 53.257 54.1538 55.8884 54.1538H66.1544C68.7857 54.1538 71.1206 52.3759 71.7506 49.783L81.053 12.8906H69.1193Z"}),x=r.a.createElement("path",{d:"M20.569 13.0012C17.3447 13.0012 14.2686 13.7421 11.5261 15.0755V0H0V33.5588C0 44.9302 9.22827 54.1163 20.569 54.1163C31.9468 54.1163 41.1381 44.8932 41.1381 33.5588C41.1381 22.1873 31.9468 13.0012 20.569 13.0012ZM20.569 42.5596C15.5658 42.5596 11.5261 38.5222 11.5261 33.5217C11.5261 28.5212 15.5658 24.4838 20.569 24.4838C25.5723 24.4838 29.612 28.5212 29.612 33.5217C29.612 38.5222 25.5723 42.5596 20.569 42.5596Z"}),P=function(e){var a=e.svgRef,t=e.title,n=j(e,["svgRef","title"]);return r.a.createElement("svg",N({width:82,height:55,viewBox:"0 0 82 55",fill:"#191919",ref:a},n),t?r.a.createElement("title",null,t):null,C,x)},M=r.a.forwardRef((function(e,a){return r.a.createElement(P,N({svgRef:a},e))})),G=(t.p,function(e){Object(u.a)(t,e);var a=Object(p.a)(t);function t(e){var n;Object(l.a)(this,t),(n=a.call(this,e)).handleKeyPress=function(e){"gameOver"!==n.state.gameState&&("z"===e.key?n.nextPlay("home"):"p"===e.key&&n.nextPlay("away"))},n.nextPlay=function(e){var a=n.state;a=n.incrementPlays(a),"home"===e?a.home.score++:"away"===e&&a.away.score++,n.checkForOvertime(a)&&(a.gameState="overtime",n.props.setOvertime()),a=n.checkForWinner(a),n.setState(a)};return n.state={winScore:11,serveChangeLimit:5,plays:0,gameMode:n.props.gameMode,gameState:"playing",winner:{id:0,name:""},home:{id:e.players.home.id,name:e.players.home.name,score:0,isServing:e.players.home.isServing},away:{id:e.players.away.id,name:e.players.away.name,score:0,isServing:e.players.away.isServing}},n}return Object(m.a)(t,[{key:"componentDidMount",value:function(){document.addEventListener("keyup",this.handleKeyPress,!1)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keyup",this.handleKeyPress,!1)}},{key:"incrementPlays",value:function(e){return e.plays++,e.plays%e.serveChangeLimit===0&&(e.home.isServing=!e.home.isServing,e.away.isServing=!e.away.isServing),e}},{key:"checkForOvertime",value:function(e){if("overtime"===e.gameState)return!0;var a=e.winScore-1;return e.home.score===a&&e.away.score===a}},{key:"checkForWinner",value:function(e){function a(e){return{id:e.id,name:e.name}}var t={id:"",name:""};if("overtime"===e.gameState?e.home.score-e.away.score>=2?t=a(e.home):e.away.score-e.home.score>=2&&(t=a(e.away)):e.home.score===e.winScore?t=a(e.home):e.away.score===e.winScore&&(t=a(e.away)),""!==t.name){e.winner=t,"standard"===e.gameMode&&_(e).then((function(e){return console.log(e)})).catch((function(e){return console.log(e)}));var n={winner:t,scores:{home:e.home.score,away:e.away.score}};this.props.setGameOver(n)}return e}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"scoreboard"},r.a.createElement("div",{className:"scoreboard__scorecards"},r.a.createElement(O,{name:this.state.home.name,score:("0"+this.state.home.score).slice(-2),isServing:this.state.home.isServing}),r.a.createElement(O,{name:this.state.away.name,score:("0"+this.state.away.score).slice(-2),isServing:this.state.away.isServing})),r.a.createElement("button",{className:"scoreboard__quit",onClick:function(){return e.props.setNewGame()}},"Quit Match"),r.a.createElement(M,{className:"scoreboard__logo"}))}}]),t}(r.a.Component)),A=function(e){Object(u.a)(t,e);var a=Object(p.a)(t);function t(){return Object(l.a)(this,t),a.apply(this,arguments)}return Object(m.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"gameover"},r.a.createElement("h2",{className:"gameover__gameover"},"Game Over"),r.a.createElement("h1",{className:"gameover__winner"},this.props.winner," wins!"),r.a.createElement("p",{className:"gameover__score"},this.props.home.name," ",this.props.home.score," - ",this.props.away.score," ",this.props.away.name),r.a.createElement("button",{className:"gameover__btn-new btn-main",onClick:function(){return e.props.setNewGame()}},"Start New Match"))}}]),t}(r.a.Component),L=t(10),I=t.n(L),T=t(11),H=t.n(T);var D=function(){var e={gameMode:"standard",gameState:"setup",winner:{id:0,name:""},players:{home:{id:"",name:"Home",score:0,isServing:!0},away:{id:"",name:"Away",score:0,isServing:!1}}},a=Object(n.useState)(e),t=Object(c.a)(a,2),s=t[0],i=t[1];return r.a.createElement("div",{className:"App \n                      ".concat("playing"===s.gameState?"App--playing":"","\n                      ").concat("overtime"===s.gameState?"App--overtime":"")},r.a.createElement("img",{className:"App__bg",src:"gameover"===s.gameState?H.a:I.a,alt:"Background gradient"}),r.a.createElement("div",{className:"App__container"},r.a.createElement(h,null),"setup"===s.gameState?r.a.createElement(k,{startGame:function(e){i(e)}}):"","playing"===s.gameState||"overtime"===s.gameState?r.a.createElement(G,{players:s.players,gameMode:s.gameMode,setOvertime:function(){s.gameState="overtime",i(Object(o.a)({},s))},setGameOver:function(e){!function(e){s.gameState="gameover",s.winner=e.winner,s.players.home.score=e.scores.home,s.players.away.score=e.scores.away,i(Object(o.a)({},s))}(e)},setNewGame:function(){i(e)}}):"","gameover"===s.gameState?r.a.createElement(A,{winner:s.winner.name,home:s.players.home,away:s.players.away,setNewGame:function(){i(e)}}):""))};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(D,null)),document.getElementById("root"))}],[[13,1,2]]]);
//# sourceMappingURL=main.a75b66e5.chunk.js.map