"use strict";(self.webpackChunkkonas_front_end=self.webpackChunkkonas_front_end||[]).push([[74],{6227:(e,t,s)=>{s.r(t),s.d(t,{default:()=>f});var l=s(2791);const a={scan:"/images/illustration/scan.png",success_scan:"/images/illustration/success_scan.png"};var n=s(7689),d=s(4164),m=s(9008),i=s.n(m),r=s(8556),c=s(6891),o=s(105);const x=()=>{var e;const t=(0,r.D)({mutationFn:e=>(async e=>await o.dC.post(c.Z.updateKehadiran(e)))(e)});return{...t,...t.data,data:null===t||void 0===t||null===(e=t.data)||void 0===e?void 0:e.data}},u={qr_root:"styles_qr_root__pPylu",qr_wrap:"styles_qr_wrap__WjRmv"};var p=s(184);function h(e){let{qrVisible:t={},setView:s=(()=>{}),setVisible:l=(()=>{})}=e;const a=(0,n.s0)(),{mutate:m}=x();return null!==t&&void 0!==t&&t.open?d.createPortal((0,p.jsx)(p.Fragment,{children:(0,p.jsx)("div",{className:u.qr_root,children:(0,p.jsxs)("div",{className:u.qr_wrap,children:[(0,p.jsx)(i(),{delay:100,style:{height:240,width:320},onError:()=>{},onScan:e=>{"profile"===(null===t||void 0===t?void 0:t.type)?(e=>{e&&a(e.text)})(e):(e=>{if(e){const t=e.text.split("/").pop();m(t,{onSuccess:()=>{s({status:2}),l(null)},onError:e=>{s({status:3,message:e.message}),l(null)}})}})(e)}}),(0,p.jsx)("button",{className:"mt-8 border-white text-white bg-slate-800 border-2 p-2 rounded-md w-full",onClick:()=>l(null),children:"Tutup"})]})})}),document.body):null}function f(){const[e,t]=(0,l.useState)({status:1}),[s,n]=(0,l.useState)(null),d=()=>(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("img",{alt:"scan",src:a.scan}),(0,p.jsx)("p",{className:"text-sm md:text-xl mt-3 md:mt-16",children:"Silakan Melakukan Scan"}),(0,p.jsx)("p",{className:"text-sm md:text-xl mt-1 md:mt-4 text-center",children:"Anda dapat melakukan scan Kehadiran atau profile peserta"}),(0,p.jsxs)("div",{className:"mt-3 md:mt-16 flex flex-col md:flex-row gap-2 md:gap-8 w-full justify-center",children:[(0,p.jsx)("button",{className:"bg-[#290849] w-full md:w-60 p-2 md:p-3 rounded-md text-white text-sm md:text-xl font-semibold",onClick:()=>n({open:!0,type:"presence"}),children:"Scan Kehadiran"}),(0,p.jsx)("button",{className:"bg-[#290849] w-full md:w-60 p-2 md:p-3 rounded-md text-white text-sm md:text-xl font-semibold",onClick:()=>n({open:!0,type:"profile"}),children:"Scan Profile"})]})]}),m=()=>(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("img",{alt:"scan",src:a.success_scan}),(0,p.jsx)("p",{className:"text-sm md:text-xl mt-3 md:mt-16",children:"Berhasil Absen!"}),(0,p.jsx)("p",{className:"text-sm md:text-xl mt-1 md:mt-4 text-center",children:"Peserta Telah Berhasil di Absen"}),(0,p.jsx)("div",{className:"mt-3 md:mt-16 flex flex-col md:flex-row gap-2 md:gap-8 w-full justify-center",children:(0,p.jsx)("button",{className:"bg-[#290849] w-full md:w-60 p-2 md:p-3 rounded-md text-white text-sm md:text-xl font-semibold",onClick:()=>{t({status:1})},children:"Kembali"})})]}),i=()=>(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("p",{className:"text-sm md:text-xl mt-3 md:mt-16",children:"Gagal Scan!"}),(0,p.jsx)("p",{className:"text-sm md:text-xl mt-1 md:mt-4 text-center",children:(null===e||void 0===e?void 0:e.message)||"Terjadi Kesalahan"}),(0,p.jsx)("div",{className:"mt-3 md:mt-16 flex flex-col md:flex-row gap-2 md:gap-8 w-full justify-center",children:(0,p.jsx)("button",{className:"bg-[#290849] w-full md:w-60 p-2 md:p-3 rounded-md text-white text-sm md:text-xl font-semibold",onClick:()=>{t({status:1})},children:"Kembali"})})]});return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("p",{className:"ml-2 md:ml-6 mb-2 md:mb-0 text-2xl font-semibold",children:"Scan"}),(0,p.jsxs)("div",{className:"bg-[#F6F6F6] px-6 py-4  md:py-24 md:m-6 md:rounded-md shadow-lg flex flex-col justify-center items-center max-h-screen",children:[1===e.status&&(0,p.jsx)(d,{}),2===e.status&&(0,p.jsx)(m,{}),3===e.status&&(0,p.jsx)(i,{}),(0,p.jsx)(h,{qrVisible:s,setView:t,setVisible:n})]})]})}},926:(e,t,s)=>{s.r(t),s.d(t,{default:()=>a});s(2791);var l=s(184);function a(){return(0,l.jsxs)("div",{className:"border-2 w-full overflow-x-auto whitespace-nowrap flex",style:{gap:"50px"},children:[(0,l.jsx)("div",{className:"bg-white shadow-lg p-2 rounded-md w-full inline-block",style:{minWidth:"300px"},children:"Menu Voting 1"}),(0,l.jsx)("div",{className:"bg-white shadow-lg p-2 rounded-md w-full inline-block",style:{minWidth:"300px"},children:"Menu Voting 2"}),(0,l.jsx)("div",{className:"bg-white shadow-lg p-2 rounded-md w-full inline-block",style:{minWidth:"300px"},children:"Menu Voting 3"})]})}}}]);
//# sourceMappingURL=Vote.d91e6331.chunk.js.map