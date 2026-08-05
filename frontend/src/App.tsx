import { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./App.css";

import {
  ESCROW_ADDRESS,
  USDC_ADDRESS,
  REGISTRY_ADDRESS
} from "./contracts";


const escrowABI = [
{
inputs:[
{
internalType:"uint256",
name:"_invoiceId",
type:"uint256"
},
{
internalType:"address",
name:"_seller",
type:"address"
},
{
internalType:"uint256",
name:"_amount",
type:"uint256"
}
],
name:"createEscrow",
outputs:[],
stateMutability:"nonpayable",
type:"function"
},

{
inputs:[],
name:"escrowCount",
outputs:[
{
internalType:"uint256",
name:"",
type:"uint256"
}
],
stateMutability:"view",
type:"function"
},

{
inputs:[
{
internalType:"uint256",
name:"",
type:"uint256"
}
],
name:"escrows",
outputs:[
{
internalType:"uint256",
name:"invoiceId",
type:"uint256"
},
{
internalType:"address",
name:"buyer",
type:"address"
},
{
internalType:"address",
name:"seller",
type:"address"
},
{
internalType:"uint256",
name:"amount",
type:"uint256"
},
{
internalType:"bool",
name:"released",
type:"bool"
}
],
stateMutability:"view",
type:"function"
},

{
inputs:[
{
internalType:"uint256",
name:"_escrowId",
type:"uint256"
}
],
name:"releaseEscrow",
outputs:[],
stateMutability:"nonpayable",
type:"function"
}
];


const invoiceABI = [

{
inputs:[
{
internalType:"uint256",
name:"_amount",
type:"uint256"
}
],
name:"createInvoice",
outputs:[],
stateMutability:"nonpayable",
type:"function"
},

{
inputs:[],
name:"invoiceCount",
outputs:[
{
internalType:"uint256",
name:"",
type:"uint256"
}
],
stateMutability:"view",
type:"function"
},

{
inputs:[
{
internalType:"uint256",
name:"",
type:"uint256"
}
],
name:"invoices",
outputs:[
{
internalType:"uint256",
name:"id",
type:"uint256"
},
{
internalType:"address",
name:"owner",
type:"address"
},
{
internalType:"uint256",
name:"amount",
type:"uint256"
},
{
internalType:"uint256",
name:"createdAt",
type:"uint256"
},
{
internalType:"bool",
name:"paid",
type:"bool"
}
],
stateMutability:"view",
type:"function"
}

];

const usdcABI = [
{
inputs:[
{
internalType:"address",
name:"to",
type:"address"
},
{
internalType:"uint256",
name:"amount",
type:"uint256"
}
],
name:"mint",
outputs:[],
stateMutability:"nonpayable",
type:"function"
},

{
inputs:[
{
internalType:"address",
name:"account",
type:"address"
}
],
name:"balanceOf",
outputs:[
{
internalType:"uint256",
name:"",
type:"uint256"
}
],
stateMutability:"view",
type:"function"
}
];


function App(){


const [account,setAccount]=useState("");

const [balance,setBalance]=useState("0");

const [seller,setSeller]=useState("");

const [sellerBalance,setSellerBalance]=useState("0");

const [escrows,setEscrows]=useState<any[]>([]);

const [invoiceAmount,setInvoiceAmount]=useState("");

const [invoices,setInvoices]=useState<any[]>([]);

const totalInvoices = invoices.length;

const totalEscrows = escrows.length;


async function connectWallet(){

const provider =
new ethers.BrowserProvider(
window.ethereum
);


const accounts =
await provider.send(
"eth_requestAccounts",
[]
);


setAccount(accounts[0]);


await loadBalance(accounts[0]);

}





async function loadBalance(address:string){

const provider =
new ethers.BrowserProvider(
window.ethereum
);



const usdc =
new ethers.Contract(
USDC_ADDRESS,
usdcABI,
provider
);



const bal =
await usdc.balanceOf(address);



setBalance(

Number(
ethers.formatUnits(
bal,
18
)
).toFixed(2)

);


}





async function loadInvoices(){

try{


const provider =
new ethers.BrowserProvider(
window.ethereum
);



const contract =
new ethers.Contract(

REGISTRY_ADDRESS,

invoiceABI,

provider

);



const count =
await contract.invoiceCount();



let list:any[]=[];



for(
let i=1;
i<=Number(count);
i++
){


const data =
await contract.invoices(i);



list.push({

id:i,

owner:data.owner,

amount:
ethers.formatUnits(
data.amount,
18
),

date:
new Date(
Number(data.createdAt)*1000
).toLocaleString(),

paid:data.paid

});


}



setInvoices(list);



}
catch(e){

console.log(e);

}

}





async function loadEscrows(){

try{


const provider =
new ethers.BrowserProvider(
window.ethereum
);



const contract =
new ethers.Contract(

ESCROW_ADDRESS,

escrowABI,

provider

);



const count =
await contract.escrowCount();



let list:any[]=[];



for(
let i=1;
i<=Number(count);
i++
){


const data =
await contract.escrows(i);



list.push({

id:i,

invoiceId:data.invoiceId,

buyer:data.buyer,

seller:data.seller,

amount:

ethers.formatUnits(
data.amount,
18
),

released:data.released

});


}



setEscrows(list);



}
catch(e){

console.log(e);

}

}
async function mintUSDC(){

try{

const provider =
new ethers.BrowserProvider(
window.ethereum
);


const signer =
await provider.getSigner();


const usdc =
new ethers.Contract(
USDC_ADDRESS,
usdcABI,
signer
);


const amount =
ethers.parseUnits(
"1000",
18
);


const tx =
await usdc.mint(
account,
amount
);


await tx.wait();


alert("1000 Test USDC Minted");


loadBalance(account);


}
catch(error:any){

alert(
error.reason ||
error.message
);

}

}
async function createInvoice(){

try{


const provider =
new ethers.BrowserProvider(
window.ethereum
);



const signer =
await provider.getSigner();



const contract =
new ethers.Contract(

REGISTRY_ADDRESS,

invoiceABI,

signer

);



const amountWei =
ethers.parseUnits(
invoiceAmount,
18
);



const tx =
await contract.createInvoice(
amountWei
);



await tx.wait();



alert("Invoice Created");



loadInvoices();



}
catch(error:any){

alert(
error.reason ||
error.message
);

}

}






async function createEscrowFromInvoice(invoice:any){

try{


if(!ethers.isAddress(seller)){

alert("Invalid Seller Address");

return;

}



const provider =
new ethers.BrowserProvider(
window.ethereum
);



const signer =
await provider.getSigner();



const amountWei =
ethers.parseUnits(
invoice.amount,
18
);




const usdc =
new ethers.Contract(

USDC_ADDRESS,

[
"function approve(address spender,uint256 amount) public returns(bool)"
],

signer

);



const approve =
await usdc.approve(

ESCROW_ADDRESS,

amountWei

);



await approve.wait();





const contract =
new ethers.Contract(

ESCROW_ADDRESS,

escrowABI,

signer

);





const tx =
await contract.createEscrow(

invoice.id,

seller,

amountWei

);



await tx.wait();




alert("Escrow Created");



loadEscrows();



}
catch(error:any){

alert(
error.reason ||
error.message
);

}

}







async function releasePayment(id:number){

try{


const provider =
new ethers.BrowserProvider(
window.ethereum
);



const signer =
await provider.getSigner();




const contract =
new ethers.Contract(

ESCROW_ADDRESS,

escrowABI,

signer

);



const tx =
await contract.releaseEscrow(id);



await tx.wait();



alert("Payment Released");



loadEscrows();

loadInvoices();



if(account){

loadBalance(account);

}



}
catch(error:any){

alert(
error.reason ||
error.message
);

}

}
async function loadSellerBalance(){

try{

if(!ethers.isAddress(seller)){

alert("Invalid Seller Address");

return;

}


const provider =
new ethers.BrowserProvider(window.ethereum);



const usdc =
new ethers.Contract(

USDC_ADDRESS,

[
"function balanceOf(address account) view returns(uint256)"
],

provider

);



const balance =
await usdc.balanceOf(seller);



setSellerBalance(

ethers.formatUnits(
balance,
18
)

);


}
catch(e){

console.log(e);

}

}





useEffect(()=>{


if(window.ethereum){


loadInvoices();

loadEscrows();


}


},[]);
useEffect(()=>{

if(ethers.isAddress(seller)){

loadSellerBalance();

}

},[seller]);

return (

<div className="container">


<h1>
ArcTrade Finance
</h1>

<p className="description">
A decentralized invoice financing platform built on Arc.
Users can create invoices, lock USDC in escrow,
and release payments securely to sellers.
</p>

<div className="stats">

<div className="card">
<h3>
Invoices
</h3>

<p>
{totalInvoices}
</p>

</div>


<div className="card">
<h3>
Escrows
</h3>

<p>
{totalEscrows}
</p>

</div>


<div className="card">
<h3>
Volume
</h3>

<p>
{
escrows.reduce(
(sum,e)=>sum+Number(e.amount),
0
)
}
USDC
</p>

</div>

</div>



<button onClick={connectWallet}>

{

account

?

account.slice(0,10)+"..."

:

"Connect Wallet"

}

</button>

<button onClick={mintUSDC}>
Get 1000 Test USDC
</button>

<div className="wallet-box">

<p>

<b>
Wallet:
</b>

<br/>

{
account || "-"
}

</p>




<p>

<b>
USDC Balance:
</b>

<br/>

{
balance
}

USDC

</p>

</div>


<div className="seller-box">


<h2>
Seller Address
</h2>


<input

placeholder="Seller Wallet Address"

value={seller}

onChange={
e=>setSeller(
e.target.value
)
}

/>



<p>

Seller USDC Balance:

<br/>

{sellerBalance} USDC

</p>

</div>





<h2>
Create Invoice
</h2>



<input

placeholder="Invoice Amount USDC"

value={invoiceAmount}

onChange={
e=>setInvoiceAmount(
e.target.value
)
}

/>



<button onClick={createInvoice}>

Create Invoice

</button>






<h2>
Invoice History
</h2>




{

invoices.map(i=>(


<div key={i.id}>


<hr/>


<h3>
Invoice #{i.id}
</h3>



<p>
Amount: {i.amount} USDC
</p>



<p>
Owner:
<br/>
{i.owner}
</p>



<p>
Date:
<br/>
{i.date}
</p>



<p>

Status:

{

i.paid

?

" Paid"

:

" Unpaid"

}

</p>





{

!i.paid &&

<button

onClick={

()=>createEscrowFromInvoice(i)

}

>

Create Escrow

</button>

}



</div>


))


}
<h2>
Escrow History
</h2>



{

escrows.map(e=>(


<div key={e.id}>


<hr/>



<h3>
Escrow #{e.id}
</h3>



<p>
Invoice ID: {e.invoiceId}
</p>



<p>
Amount: {e.amount} USDC
</p>



<p>
Buyer:
<br/>
{e.buyer}
</p>



<p>
Seller:
<br/>
{e.seller}
</p>



<p>

Status:

{

e.released

?

" Released"

:

" Locked"

}

</p>





{

!e.released &&

<button

onClick={

()=>releasePayment(e.id)

}

>

Release Payment

</button>

}



</div>


))


}



</div>

);


}


export default App;