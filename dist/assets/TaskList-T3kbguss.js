import{R as V,n as t,at as J,ay as K,r as b,aV as Q,a7 as W,a6 as X,c6 as Y,v as Z,k,bi as ee,a9 as se,c7 as re,aP as p,bl as de,j as e,H as h,J as x,K as le,a3 as ne,aq as te,bf as ce,bg as ie,c8 as ae,bm as oe,aO as he,az as xe}from"./index-VLfZ_LXD.js";import{G as je}from"./mdbreact.esm-DvacgDJ9.js";import{M as a}from"./Modal-BoySAo34.js";const pe=()=>{var v,T;const[R,j]=V.useState(!1),c=t(J),r=t(K),[q,m]=b.useState(null),[y,g]=b.useState(""),B=t(Q),I=t(W),u=t(X),f=t(Y),d=Z(),{enqueueSnackbar:o}=k(),N=t(ee);b.useEffect(()=>{u&&(o(u,{variant:"error"}),d(se())),f&&(o("Task Deleted",{variant:"success"}),d(re()),d(p())),N&&(o("Task Updated Successfully!",{variant:"success",anchorOrigin:{vertical:"top",horizontal:"center"},onExited:()=>{d(de())}}),d(p())),d(p())},[d,u,N,o,f]);const H=l=>{window.confirm("Are you sure you want to delete this Task?")&&d(ae(l))},L=(l,s)=>{const i={id:l,taskData:{orderItemId:s,employeeId:y}};d(oe(i)),console.log(i),m(null),g("")},M=l=>{d(he()),m(l)},$=l=>{j(!0),d(xe(l))},G=()=>{const l={columns:[{label:"User",field:"user",sort:"asc"},{label:"Product",field:"product",sort:"asc"},{label:"Employee",field:"employee",sort:"asc"},{label:"Status",field:"status",sort:"asc"},{label:"Actions",field:"actions",sort:"asc"}],rows:[]};return c==null||c.forEach(s=>{var C,D,E,S,_,w,F,P,A,z,O;const i=q===s._id;l.rows.push({user:e.jsxs(e.Fragment,{children:[(D=(C=s==null?void 0:s.order)==null?void 0:C.user)==null?void 0:D.name,e.jsx("br",{}),e.jsxs("span",{className:"text-secondary",style:{fontSize:"14px"},children:["(",(S=(E=s==null?void 0:s.order)==null?void 0:E.user)==null?void 0:S.phoneNumber,")"]})]}),product:e.jsxs(ne,{to:`/product/${(w=(_=s==null?void 0:s.orderItem)==null?void 0:_.productId)==null?void 0:w._id}`,style:{color:"unset",textDecoration:"underline"},children:[" ",(P=(F=s==null?void 0:s.orderItem)==null?void 0:F.productId)==null?void 0:P.name,"  "]}),status:(A=s==null?void 0:s.orderItem)==null?void 0:A.status,employee:e.jsx(e.Fragment,{children:i?e.jsxs("select",{value:y,onChange:n=>g(n.target.value),children:[e.jsx("option",{disabled:!0,value:"",children:"Select"}),B.map(n=>e.jsx("option",{value:n._id,children:n.name},n._id))]}):e.jsxs(e.Fragment,{children:[(z=s==null?void 0:s.employee)==null?void 0:z.name,e.jsx("br",{}),e.jsxs("span",{className:"text-secondary",style:{fontSize:"14px"},children:["(",(O=s==null?void 0:s.employee)==null?void 0:O.phoneNumber,")"]})]})}),actions:e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:n=>$(s._id),className:"btn btn-primary",children:e.jsx(te,{})}),"    ",i?e.jsxs(e.Fragment,{children:["  ",e.jsx("button",{className:"btn btn-primary",onClick:()=>L(s==null?void 0:s.order._id,s==null?void 0:s.orderItem._id),children:"Assign"}),"     ",e.jsx("button",{className:"btn btn-danger",onClick:()=>m(null),children:"Cancel"})," "]}):e.jsx("button",{className:"btn btn-primary",onClick:()=>M(s._id),children:e.jsx(ce,{})}),"    ",e.jsx("button",{onClick:n=>H(s._id),className:"btn btn-danger",children:e.jsx(ie,{})})]})})}),l},U=()=>{j(!1)};return console.log(r),e.jsxs("div",{children:[e.jsx("div",{children:e.jsx("h2",{children:"Tasks"})}),I==="loading"?e.jsx("div",{className:"d-flex align-items-start justify-content-center",children:e.jsx("div",{className:"loader"})}):I==="succeeded"&&c&&c.length===0?e.jsx("h6",{className:"mt-3",children:"No Tasks Placed"}):e.jsx(e.Fragment,{children:e.jsx(h,{children:e.jsx(x,{children:e.jsx("div",{className:"table-responsive",children:e.jsx(je,{className:"px-3",bordered:!0,striped:!0,hover:!0,searching:!1,responsive:!0,data:G()})})})})}),e.jsx(a,{show:R,onHide:U,size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,children:r&&e.jsxs(e.Fragment,{children:["  ",e.jsx(a.Header,{closeButton:!0,children:e.jsxs(a.Title,{id:"contained-modal-title-vcenter",children:[r.order.user.name,"'s Order"]})}),e.jsxs(a.Body,{children:[e.jsx(h,{children:e.jsx(x,{className:"col-12 mt-3 col-lg-12",children:e.jsxs("div",{id:"order_summary",children:[e.jsx("h4",{children:"Product Details"}),e.jsx("hr",{}),e.jsx("table",{className:"table",children:e.jsxs("tbody",{children:[r.orderItem.productId.images&&e.jsx("tr",{children:e.jsxs("td",{children:[e.jsx("img",{width:"100",src:(T=(v=r.orderItem.productId)==null?void 0:v.images[0])==null?void 0:T.image,alt:""})," "]})}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("b",{children:"Product Name"})}),e.jsx("td",{children:r.orderItem.productId.name})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("b",{children:"Product Price"})}),e.jsxs("td",{children:[": ",r.orderItem.productId.price]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("b",{children:"Quantity"})}),e.jsxs("td",{children:[": ",r.orderItem.quantity]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("b",{children:"Product Status"})}),e.jsxs("td",{children:[": ",r.orderItem.status.includes("pending")||r.orderItem.status.includes("Pending")?e.jsx("span",{style:{color:"red"},children:r.orderItem.status}):e.jsx("span",{style:{color:"green"},children:r.orderItem.status})]})]})]})}),e.jsx("hr",{})]})})}),e.jsx(h,{children:e.jsx(x,{className:"col-12 col-lg-12 mt-3",children:e.jsxs("div",{id:"order_summary",children:[e.jsx("h4",{children:`${r.order.user.name}'s Details`}),e.jsx("hr",{}),e.jsx("table",{className:"table",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("b",{children:"Order ID"})}),e.jsxs("td",{children:[": ",r.order._id]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("b",{children:"Name"})}),e.jsxs("td",{children:[": ",r.order.user.name]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("b",{children:"Email"})}),e.jsxs("td",{children:[": ",r.order.user.email]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("b",{children:"Phone Number"})}),e.jsxs("td",{children:[": ",r.order.user.phoneNumber]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("b",{children:"Order Date"})}),e.jsxs("td",{children:[": ",new Date(r.order.paidAt).toLocaleDateString()]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("b",{children:"Total Amount"})}),e.jsxs("td",{children:[": ",r.orderItem.productId.price*r.orderItem.quantity]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("b",{children:"Address"})}),e.jsxs("td",{children:[": ",r.order.user.address,", ",r.order.user.city,", ",r.order.user.postalCode]})]})]})}),e.jsx("hr",{})]})})}),e.jsx(h,{children:e.jsx(x,{className:"col-12 mt-3 col-lg-12",children:e.jsxs("div",{id:"order_summary",children:[e.jsx("h4",{children:`${r.employee.name}'s Details`}),e.jsx("hr",{}),e.jsx("table",{className:"table",children:e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("b",{children:"Name"})}),e.jsxs("td",{children:[": ",r.employee.name]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("b",{children:"Employee Type"})}),e.jsxs("td",{children:[": ",r.employee.employeeType]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("b",{children:"Email"})}),e.jsxs("td",{children:[": ",r.employee.email]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("b",{children:"Phone Number"})}),e.jsxs("td",{children:[": ",r.employee.phoneNumber]})]})]})}),e.jsx("hr",{})]})})})]}),e.jsx(a.Footer,{children:e.jsx(le,{type:"button",className:"btn btn-danger",onClick:()=>j(!1),children:"Close"})})]})})]})};export{pe as default};
