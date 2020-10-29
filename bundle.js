(()=>{"use strict";(()=>{const e=(e,t,o,n,r)=>{const i=new XMLHttpRequest;i.responseType="json",i.timeout=1e4,i.open(e,t),i.send(o),i.addEventListener("load",(()=>{200===i.status?n(i.response):r(`Статус ответа: ${i.status} ${i.statusText}`)})),i.addEventListener("error",(()=>{r("Произошла ошибка соединения, проверьте подключение к интернету и повторите попытку")})),i.addEventListener("timeout",(()=>{r(`Запрос не успел выполниться за ${i.timeout}мс`)}))};window.backend={upload(t,o){e("GET","https://21.javascript.pages.academy/keksobooking/data",null,t,o)},download(t,o,n){e("POST","https://21.javascript.pages.academy/keksobooking",t,o,n)}}})(),(()=>{const e=(e,t)=>Math.floor(Math.random()*(t-e)+e);window.util={isEscEvent:(e,t)=>{"Escape"===e.key&&(e.preventDefault(),t())},isEnterEvent:(e,t)=>{"Enter"===e.key&&(e.preventDefault(),t())},getRandomNumber:e,getRandomElement:e=>e[Math.floor(Math.random()*e.length)],getRandomArr:t=>t.slice(e(0,t.length)),getRandomLocation:()=>`${e(1,1e3)}, ${e(1,1e3)}`,onError:e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center",t.style.width="800px",t.style.height="100px",t.style.paddingTop="30px",t.style.backgroundColor="black",t.style.color="white",t.style.position="absolute",t.style.top="200px",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,t.style.cursor="pointer",document.body.insertAdjacentElement("afterbegin",t),t.addEventListener("click",(()=>{t.remove()}))}}})(),(()=>{const e=document.querySelector(".ad-form "),t=e.querySelector("#title"),o=t.minLength,n=e.querySelector("#price"),r=()=>{n.validity.rangeUnderflow?n.setCustomValidity("Цена не может быть меньше "+n.min):n.validity.rangeOverflow?n.setCustomValidity("Цена не может быть больше "+n.max):n.setCustomValidity("")},i={bungalow:0,flat:1e3,house:5e3,palace:1e4},a=e=>{n.setAttribute("min",e),n.setAttribute("placeholder",e)},d=e.querySelector("#type");let s=i[d.value];a(s);const l=e.querySelector("#timein"),c=e.querySelector("#timeout"),u=e.querySelector("#room_number"),p=e.querySelector("#capacity"),m={1:["1"],2:["1","2"],3:["1","2","3"],100:["0"]},v=()=>{let e=u.value,t=p.querySelectorAll("option");t.forEach((t=>{-1===m[e].indexOf(t.value)?t.disabled=!0:t.disabled=!1})),t[p.selectedIndex].disabled&&(p.querySelector("option:not([disabled])").selected=!0)};v(),window.validation={adForm:e,adTitle:t,onAdTitleSetCustomValidity:()=>{let e=t.value.length;e<o?t.setCustomValidity("Минимальная длина — 30 символов, ещё "+(o-e)):t.setCustomValidity(""),t.reportValidity()},adPrice:n,onInvalidAdPriceCheckValidity:()=>{r()},onInputAdPriceCheckValidity:()=>{r()},housingType:d,onHousingTypeChange:()=>{s=i[d.value],a(s)},checkOut:c,checkIn:l,onCheckInChange:()=>{var e;e=l.value,c.value=e},onCheckOutChange:()=>{var e;e=c.value,l.value=e},adRoomsNumber:u,onAdRoomsChange:()=>{v()}}})(),(()=>{const{adForm:e}=window.validation,t=document.querySelector(".map__pins"),o=t.querySelector(".map__pin--main"),n=e.querySelector("#address"),r=Math.floor(o.offsetLeft+32.5),i=Math.floor(o.offsetTop+32.5),a=()=>{n.value=`${r}, ${i}`};a(),n.setAttribute("readonly","true"),window.mainPin={MAIN_PIN_WIDTH:65,MAIN_PIN_HEIGHT:65,PIN_TIP_HEIGHT:22,MAIN_PIN_START_X:570,MAIN_PIN_START_Y:375,setupAddress:()=>{const e=Math.floor(o.offsetLeft+32.5),t=Math.floor(o.offsetTop+65+22);n.value=`${e}, ${t}`},pinsArea:t,mainPin:o,setInitPinMainPosition:a}})(),(()=>{const e=document.querySelector(".map"),t=e.querySelector(".map__filters-container"),{isEscEvent:o}=window.util,n=e=>{o(e,r)},r=()=>{const t=e.querySelector(".map__card");t&&t.remove(),document.removeEventListener("keydown",n)};window.card={map:e,mapFiltersContainer:t,showPopup:o=>{r(),(o=>{const n=document.querySelector("#card").content.cloneNode(!0),i=document.createDocumentFragment(),{title:a,address:d,price:s,type:l,rooms:c,guests:u,checkin:p,checkout:m,features:v,description:h,photos:y}=o.offer,{avatar:f}=o.author;n.querySelector(".popup__close").addEventListener("click",(()=>{r()}));const w=n.querySelector(".popup__features");w.innerHTML="";const g=n.querySelector(".popup__type");switch(l){case"flat":g.textContent="квартира";break;case"bungalow":g.textContent="бунгало";break;case"house":g.textContent="дом";break;case"palace":g.textContent="дворец"}n.querySelector(".popup__title").textContent=a,n.querySelector(".popup__text--address").textContent=d,n.querySelector(".popup__text--price").textContent=s+"₽/ночь",n.querySelector(".popup__text--capacity").textContent=`${c} комнат${(e=>{let t=e;return e>20&&(t=e%10),e>=5&&e<=20?"":{0:"",1:"а",2:"ы",3:"ы",4:"ы",5:"",6:"",7:"",8:"",9:""}[t]})(c)} для ${u} гост${(e=>{let t=e;return e>=10&&(t=e%10),1===t?"я":"ей"})(u)}`,n.querySelector(".popup__text--time").textContent=`Заезд после ${p}, выезд до ${m}`,w.appendChild(((e,t)=>(e.forEach((e=>{const o=document.createElement("li");o.className="popup__feature popup__feature--"+e,t.appendChild(o)})),t))(v,i)),n.querySelector(".popup__description").textContent=h,((e,t)=>{const o=e.querySelector(".popup__photos"),n=o.querySelector(".popup__photo");o.innerHTML="",t.forEach((e=>{const t=n.cloneNode(!0);t.src=e,i.appendChild(t)})),o.appendChild(i)})(n,y),n.querySelector(".popup__avatar").src=f,e.insertBefore(n,t)})(o),document.addEventListener("keydown",n)},closePopup:r}})(),(()=>{const{showPopup:e}=window.card;window.pinAd={create:t=>{const o=document.querySelector("#pin").content.querySelector(".map__pin"),n=document.createDocumentFragment();return t.forEach((t=>{const r=o.cloneNode(!0),i=r.querySelector("img");r.style=`left: ${t.location.x-i.width/2}px;\n                     top: ${t.location.y-i.height}px;`,i.src=t.author.avatar,i.alt=t.offer.title,n.append(r),r.addEventListener("click",(()=>{e(t)}))})),n}}})(),window.debounce=e=>{let t=null;return(...o)=>{t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}},(()=>{const e=["gif","jpg","jpeg","png"],t={default:{width:"40px",height:"44px",borderRadius:"0",marginLeft:"0"},edited:{width:"70px",height:"70px",borderRadius:"5px",marginLeft:"-15px"}},{adForm:o}=window.validation,n=o.querySelector("#avatar"),r=o.querySelector(".ad-form-header__preview img"),i=o.querySelector("#images"),a=o.querySelector(".ad-form__photo-container"),d=a.querySelector(".ad-form__photo"),s=(t,o)=>{const n=t.name.toLowerCase();e.some((e=>n.endsWith(e)))&&o(t)},l=(e,t)=>{e.setAttribute("width",t.width),e.setAttribute("height",t.height),e.style.width=t.width,e.style.height=t.height,e.style.borderRadius=t.borderRadius,e.style.objectFit="cover"},c=e=>{const o=t.edited,n=()=>{URL.revokeObjectURL(r.src),r.removeEventListener("load",n)};r.addEventListener("load",n),r.src=URL.createObjectURL(e),l(r,o),r.style.marginLeft=o.marginLeft},u=e=>{const o=document.createElement("div");o.classList.add("ad-form__photo"),a.appendChild(o);const n=document.createElement("img"),r=t.edited,i=()=>{URL.revokeObjectURL(n.src),n.removeEventListener("load",i)};n.addEventListener("load",i),n.src=URL.createObjectURL(e),l(n,r),n.setAttribute("alt","Фотография жилья"),d.remove(),o.appendChild(n)},p=()=>{s(n.files[0],c)},m=()=>{s(i.files[0],u)};window.uploadImage={setDisabled:()=>{const e=t.default;r.style.width=e.width,r.style.height=e.height,r.style.borderRadius=e.borderRadius,r.style.marginLeft=e.marginLeft,r.src="img/muffin-grey.svg",o.querySelectorAll(".ad-form__photo").forEach((e=>{e.remove()})),a.appendChild(d),n.removeEventListener("change",p),i.removeEventListener("change",m)},setEnabled:()=>{n.addEventListener("change",p),i.addEventListener("change",m)}}})(),(()=>{const{create:e}=window.pinAd,{map:t,closePopup:o}=window.card,{pinsArea:n}=window.mainPin,r=t.querySelector(".map__filters"),i=r.querySelectorAll("select"),a=r.querySelectorAll("input"),d="any",s="low",l="middle",c="high",u=r.querySelector("#housing-type"),p=r.querySelector("#housing-price"),m=r.querySelector("#housing-rooms"),v=r.querySelector("#housing-guests"),h=r.querySelector(".map__features"),y=()=>{document.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((e=>{e.remove()}))};let f;const w=window.debounce((t=>{y(),n.append(e(t.slice(0,5)))}));window.mapFiltering={map:t,mapFilterSelects:i,mapFilterInputs:a,mapFilter:r,removePins:y,onLoad:e=>{f=e,w(e)},onFilterGetNewAds:()=>{let e=[];f.forEach((t=>{(e=>u.value===e.offer.type||u.value===d)(t)&&(e=>p.value===s&&e.offer.price<1e4||p.value===l&&e.offer.price>=1e4&&e.offer.price<5e4||p.value===c&&e.offer.price>=5e4||p.value===e.offer.price||p.value===d)(t)&&(e=>+m.value===e.offer.rooms||m.value===d)(t)&&(e=>+v.value===e.offer.guests||v.value===d)(t)&&(e=>{const t=h.querySelectorAll(".map__checkbox:checked");return Array.from(t).every((t=>e.offer.features.includes(t.value)))})(t)&&e.push(t)})),o(),w(e)}}})(),(()=>{const{MAIN_PIN_WIDTH:e,MAIN_PIN_HEIGHT:t,PIN_TIP_HEIGHT:o,setupAddress:n,pinsArea:r,mainPin:i}=window.mainPin,{map:a}=window.mapFiltering,d=r.offsetWidth,s={top:a.offsetTop+130-(t+o),bottom:630-(t+o),left:0+Math.ceil(e/2)-i.offsetWidth,right:d+Math.ceil(e/2)-i.offsetWidth};window.dnd={onMainPinMouseMove:e=>{e.preventDefault();let t={x:e.clientX,y:e.clientY};const o=e=>{e.preventDefault();const o=t.x-e.clientX,r=t.y-e.clientY;t={x:e.clientX,y:e.clientY};const a={x:i.offsetLeft-o,y:i.offsetTop-r};a.x<s.left?a.x=s.left:a.x>s.right&&(a.x=s.right),a.y<s.top?a.y=s.top:a.y>s.bottom&&(a.y=s.bottom),i.style.top=a.y+"px",i.style.left=a.x+"px",n()},r=e=>{e.preventDefault(),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",r)};document.addEventListener("mousemove",o),document.addEventListener("mouseup",r)}}})(),(()=>{const{mapFilterSelects:e,mapFilterInputs:t,mapFilter:o,removePins:n,onLoad:r,onFilterGetNewAds:i}=window.mapFiltering,{adForm:a}=window.validation,{setupAddress:d,mainPin:s,MAIN_PIN_START_X:l,MAIN_PIN_START_Y:c,setInitPinMainPosition:u}=window.mainPin,{map:p,mapFiltersContainer:m,closePopup:v}=window.card,{isEnterEvent:h,isEscEvent:y,onError:f}=window.util,{onMainPinMouseMove:w}=window.dnd,{upload:g,download:E}=window.backend,{adTitle:_,onAdTitleSetCustomValidity:L,adPrice:b,onInvalidAdPriceCheckValidity:S,onInputAdPriceCheckValidity:q,housingType:A,onHousingTypeChange:k,checkIn:x,checkOut:C,onCheckInChange:I,onCheckOutChange:P,adRoomsNumber:T,onAdRoomsChange:M}=window.validation,{setDisabled:N,setEnabled:R}=window.uploadImage,F=a.querySelectorAll("select"),$=a.querySelectorAll("input"),H=a.querySelector("#description"),D=a.querySelector(".ad-form__element--submit"),V=e=>{e.forEach((e=>{e.setAttribute("disabled","true")}))},j=e=>{e.forEach((e=>{e.removeAttribute("disabled","true")}))};m.classList.add("hidden"),V(F),V($),V(e),V(t),H.setAttribute("disabled","true"),D.setAttribute("disabled","true");const O=e=>{0===e.button&&oe()},U=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),G=()=>{Y()},W=e=>{y(e,Y)},X=e=>{h(e,oe)},Y=()=>{document.querySelector(".success").remove(),document.removeEventListener("click",G),document.removeEventListener("keydown",W)},z=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),B=()=>{p.appendChild(z),document.addEventListener("click",J),document.addEventListener("keydown",K)},J=()=>{Q()},K=e=>{y(e,Q)},Q=()=>{document.querySelector(".error").remove(),document.removeEventListener("click",J),document.removeEventListener("keydown",K)},Z=document.querySelector(".ad-form__reset"),ee=()=>{te()},te=()=>{v(),n(),a.reset(),p.classList.add("map--faded"),a.classList.add("ad-form--disabled"),d(),s.style.left=l+"px",s.style.top=c+"px",u(),V(e),V(t),V(F),V($),m.classList.add("hidden"),H.setAttribute("disabled","true"),D.setAttribute("disabled","true"),s.addEventListener("mousedown",O),Z.removeEventListener("click",ee),o.removeEventListener("change",i),_.removeEventListener("input",L),b.removeEventListener("input",q),b.removeEventListener("invalid",S),A.removeEventListener("change",k),x.removeEventListener("change",I),C.removeEventListener("change",P),T.removeEventListener("change",M),N()};s.addEventListener("mousedown",O),s.addEventListener("mousedown",w),s.addEventListener("keydown",X);const oe=()=>{a.classList.remove("ad-form--disabled"),p.classList.remove("map--faded"),j(F),j($),j(e),j(t),H.removeAttribute("disabled","true"),D.removeAttribute("disabled","true"),m.classList.remove("hidden"),d(),g(r,f),a.addEventListener("submit",(e=>{e.preventDefault();const t=new FormData(a);E(t,(()=>{te(),p.appendChild(U),document.addEventListener("click",G),document.addEventListener("keydown",W)}),B)})),s.removeEventListener("keydown",X),s.removeEventListener("mousedown",O),Z.addEventListener("click",ee),o.addEventListener("change",i),_.addEventListener("input",L),b.addEventListener("input",q),b.addEventListener("invalid",S),A.addEventListener("change",k),x.addEventListener("change",I),C.addEventListener("change",P),T.addEventListener("change",M),R()}})()})();