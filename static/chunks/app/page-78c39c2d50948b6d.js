(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{1915:function(e,n,t){Promise.resolve().then(t.bind(t,8836))},8836:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return r}});var s=t(7437),a=t(2265),i=t(4220),l=t.n(i),o=t(9242);function r(){let[e,n]=(0,a.useState)(null),[t,i]=(0,a.useState)(null),[r,u]=(0,a.useState)(null),[c,m]=(0,a.useState)(null),[d,h]=(0,a.useState)(null);return(0,a.useEffect)(()=>{(async()=>{let e=await o.zD(),t=await e.get();console.log(t);let s=t.components.screenResolution.value[0],a=t.components.screenResolution.value[1],l=s/a,r=[{name:"4/3",value:4/3},{name:"16/9",value:16/9},{name:"16/10",value:1.6},{name:"1/1",value:1},{name:"21/9",value:21/9},{name:"32/9",value:32/9},{name:"5/4",value:5/4},{name:"3/2",value:1.5},{name:"2/1",value:2}].reduce((e,n)=>Math.abs(n.value-l)<Math.abs(e.value-l)?n:e);i("".concat(t.components.screenResolution.value[0],"x").concat(t.components.screenResolution.value[1])),n(t.visitorId),m(s>a?"Landscape":"Portrait"),u(t.components.timezone.value),h(r.name)})()},[]),(0,s.jsxs)("main",{className:l().main,children:[(0,s.jsx)("img",{src:"/fingerprint.png",alt:"fingerprint",width:"200px",height:"auto"}),e?(0,s.jsxs)("div",{children:[(0,s.jsxs)("p",{children:["Your device fingerprint is: ",(0,s.jsx)("strong",{children:e})]}),(0,s.jsxs)("p",{children:["Screen Resolution: ",(0,s.jsx)("strong",{children:t})]}),(0,s.jsxs)("p",{children:["Screen orientation: ",(0,s.jsx)("strong",{children:c})]}),(0,s.jsxs)("p",{children:["Timezone: ",(0,s.jsxs)("strong",{children:[r," | ",new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",hour12:!1})]})]}),(0,s.jsxs)("p",{children:["Aspect Ratio: ",(0,s.jsx)("strong",{children:d})]})]}):(0,s.jsx)("p",{children:"Loading fingerprint..."})]})}},4220:function(e){e.exports={main:"page_main__akH3E"}}},function(e){e.O(0,[242,971,69,744],function(){return e(e.s=1915)}),_N_E=e.O()}]);