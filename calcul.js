// CALCULATIONS

const data = require("./agents.js")

function calcResidentialElev(numFloors, numApts) {
    const elevatorsRequired = Math.ceil(numApts / numFloors / 6)*Math.ceil(numFloors / 20);
    console.log(elevatorsRequired)
    return elevatorsRequired;
}

function calcInstallFee(totalPrice, installPercentFee) {

var percentage = 0 

if (installPercentFee == "standard") {
percentage = 10
}
else if(installPercentFee == "premium") {
percentage = 15
}
else if (installPercentFee == "excelium") {
percentage = 20
}


return ( percentage / 100) * totalPrice;
}



// function calcInstallFee(totalPrice, installPercentFee) {
//     const unitPrices = data.unitPrices[tier];
//     const installPercentFee1 = data.installPercentFee[tier];
//     const totalPrice1 = numElv * unitPrices;
//     const installFeeCost =(installPercentFee / 100 ) * totalPriceElev;
//     const price = totalPriceElev + installFeeCost
//     return price;
       
// }         

module.exports = {calcResidentialElev, calcInstallFee};
            
            
            
