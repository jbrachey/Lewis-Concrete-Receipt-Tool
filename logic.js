{
    var dimTracker = new Map();
    var addCostsTracker = new Map();
    var totalAddCosts = 0;
    var totalDimEntries = 0;
    var totalCost = 0;

    function newDimEntry() {
        let form = document.createElement("form");
        form.innerHTML = "<label for=\"desc\">Description: </label>" +
            "<input type=\"text\" id=\"desc\"></input>" +
            "<label for=\"lengths\">  Length: </label>" +
            "<input type=\"text\" id=\"lengths\"></input>" +
            "<label for=\"width\">  Width: </label>" +
            "<input type=\"text\" id=\"width\"></input>";
        form.style.margin = "0.25em 0";
        document.getElementById("dimEntries").appendChild(form);
        dimTracker[totalDimEntries] = form;
        totalDimEntries++;
        document.getElementById('removeDimButton').style.display = 'inline';
    }

    function removeDimEntry() {
        totalDimEntries--;
        dimTracker[totalDimEntries].style.display = 'none';
        dimTracker.delete(totalDimEntries);
        if (totalDimEntries === 0) {
            document.getElementById('removeDimButton').style.display = 'none';
        }
    }

    function removeCost() {
        totalAddCosts--;
        addCostsTracker[totalAddCosts].style.display = 'none';
        addCostsTracker.delete(totalAddCosts);
        if (totalAddCosts === 0) {
            document.getElementById('removeCostButton').style.display = 'none';
        }
    }

    function submit() { // starts making receipt if submit is pressed
        if (totalDimEntries === 0 && totalAddCosts === 0) {
            alert("Please enter at least one dimension/cost.");
            return;
        }
        for (let i = 0; i < totalDimEntries; i++) {
            if (dimTracker[i].lengths.value.trim() === '' || dimTracker[i].width.value.trim() === ''
            || isNaN(dimTracker[i].lengths.value) || isNaN(dimTracker[i].width.value)) {
                alert("Please enter a number for every length and width text box.");
                return;
            }
            if (dimTracker[i].desc.value.length > 14) {
                alert("Please limit your dimension descriptions to 14 characters.");
                return;
            }
        }
        for (let i = 0; i < totalAddCosts; i++) {
            if (addCostsTracker[i].cost.value.trim() === '' || isNaN(addCostsTracker[i].cost.value)) {
                alert("Please enter a number for each additional cost.")
                return;
            }
            if (addCostsTracker[i].desc.value.trim() === '') {
                alert("Please enter a description for each additional cost.");
                return;
            }
            if (addCostsTracker[i].desc.value.length > 50) {
                alert("Please limit your additional cost descriptions to 50 characters.");
                return;
            }
        }
        document.getElementById("customerInfo").style.display = 'none';
        document.getElementById("dimensions").style.display = 'none';
        document.getElementById("additionalCosts").style.display = 'none';
        document.getElementById("dimEntries").style.display = 'none';
        document.getElementById("submit").style.display = 'none';
        document.getElementById("addCosts").style.display = 'none';
        document.getElementById("addCostButton").style.display = 'none';
        document.getElementById("addDimButton").style.display = 'none';
        document.getElementById("removeCostButton").style.display = 'none';
        document.getElementById("removeDimButton").style.display = 'none';
        document.getElementById("initialTitle").style.display = 'none';
        document.getElementById('secondTitle').style.display = 'inline';
        document.getElementById("name").textContent = document.getElementById("custName").value;
        document.getElementById("address").textContent = document.getElementById("custAddress").value;
        document.getElementById("phoneNum").textContent = document.getElementById("custNum").value;
        document.getElementById("email").textContent = document.getElementById("custEmail").value;
        document.getElementById("projectDetails").textContent = document.getElementById("projectDesc").value;
        let labelLine = "Description".padEnd(15, ' ');
        labelLine += "Dimensions".padEnd(12, ' ');
        labelLine += "Conversion".padEnd(12, ' ');
        labelLine += "Concrete Price".padEnd(17, ' ');
        labelLine += "Totals";
        let pre = document.createElement("pre");
        pre.textContent = labelLine;
        document.getElementById("dimLines").appendChild(pre);
        for (let i = 0; i < totalDimEntries; i++) {
            printLine(dimTracker[i].desc.value, dimTracker[i].lengths.value, dimTracker[i].width.value);
        }
        for (let i = 0; i < totalAddCosts; i++) {
            printLineAddCosts(addCostsTracker[i].desc.value, addCostsTracker[i].cost.value);
        }
        printTotalsLine();

    }
    function printLine(des, len, wid) {
        let mult = parseFloat(len) * parseFloat(wid);
        let div = roundUpToNearestHalf(mult/70);
        let total = div * 130;
        totalCost += total;
        let thisLine = des.padEnd(15, ' ');
        thisLine += `${len} x ${wid}`.padEnd(12, ' ');
        thisLine += `${mult}/70`.padEnd(12, ' ');
        thisLine += `${div} x 130`.padEnd(17, ' ');
        thisLine += `$${total.toLocaleString()}`;
        let pre = document.createElement("pre");
        pre.textContent = thisLine;
        document.getElementById("dimLines").appendChild(pre);
        
    }

    function printLineAddCosts(des, cost) {
        let thisLine = des.padEnd(56, '.');
        thisLine += `$${cost.toLocaleString()}`;
        let pre = document.createElement("pre");
        totalCost += parseFloat(cost);
        pre.textContent = thisLine;
        document.getElementById("dimLines").appendChild(pre);
    }

    function printTotalsLine() {
        let thisLine = " ".padEnd(50, ' ');
        thisLine += `Cost: $${totalCost.toLocaleString()}\n`;
        thisLine += " ".padEnd(56, ' ');
        thisLine += `x 1.5\n`;
        thisLine += " ".padEnd(49, ' ');
        let finalCost = (totalCost * 1.5).toFixed(2);
        thisLine += `Total: $${finalCost.toLocaleString()}`;
        let pre = document.createElement("pre");
        pre.textContent = thisLine;
        document.getElementById("dimLines").appendChild(pre);
    }

    function roundUpToNearestHalf(x) {
        if (x % 1 > 0.5) {
            return Math.floor(x) + 1;
        }
        else if (x % 1 > 0) {
            return Math.floor(x) + 0.5;
        }
        return Math.floor(x);
    }

    function newAddCost() {
        let form = document.createElement("form");
        form.innerHTML = "<label for=\"desc\">Description: </label>" +
        "<input type=\"text\" id=\"desc\"></input>" +
        "<label for=\"cost\">  Cost: </label>" +
        "<input type=\"text\" id=\"cost\"></input>";
        form.style.margin = "0.25em 0";
        document.getElementById("addCosts").appendChild(form);
        addCostsTracker[totalAddCosts] = form;
        totalAddCosts++;
        document.getElementById('removeCostButton').style.display = 'inline';
    }
}
