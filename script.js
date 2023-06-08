window.addEventListener("load", function () {
  let addButton = document.getElementById("add-btn");
  let dataInput = document.getElementById("data-input");

  dataInput.addEventListener("change", function () {
    addButton.disabled = false;
  });

  addButton.addEventListener("click", function () {
    let dataInputValue = dataInput.value;

    if (dataInputValue.match("<table>")) {
      let tempDiv = document.createElement("div");
      tempDiv.innerHTML = dataInputValue;

      let productList = Array.from(
        tempDiv.getElementsByClassName("card__item")
      );

      let products = {};
      productList.forEach(function (x) {
        products[x.children[1].href] =
          (Number(products[x.children[1].href]) || 0) + 1;
      });

      let tbl = document.createElement("table");
      tbl.setAttribute("class", "table table-striped-columns");
      let tblHead = document.createElement("thead");
      let tblBody = document.createElement("tbody");

      let sortedProducts = Object.entries(products).sort((a, b) => b[1] - a[1]);

      if (sortedProducts.length > 0) {
        let titleRow = document.createElement("tr");

        let productLinkClmTitle = document.createElement("th");
        productLinkClmTitle.textContent = "Product Link";
        let productCountClmTitle = document.createElement("th");
        productCountClmTitle.textContent = "Sell Count";

        titleRow.appendChild(productLinkClmTitle);
        titleRow.appendChild(productCountClmTitle);

        tblHead.appendChild(titleRow);
      }

      sortedProducts.forEach((elm) => {
        let productRow = document.createElement("tr");
        let productLinkCell = document.createElement("td");
        let productCountCell = document.createElement("td");
        let productLink = document.createElement("a");
        productLink.setAttribute("target", "_blank");

        productLink.textContent = elm[0];
        productLink.href = elm[0];
        productCountCell.textContent = elm[1];

        productLinkCell.appendChild(productLink);
        productRow.appendChild(productLinkCell);
        productRow.appendChild(productCountCell);

        tblBody.appendChild(productRow);
      });

      tbl.appendChild(tblHead);
      tbl.appendChild(tblBody);
      document.getElementById("dataTableWrapper").appendChild(tbl);

      addButton.disabled = true;
    }
  });
});
