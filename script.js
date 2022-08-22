var itemCount = 0;

$("#add").on("click", addItem);
addItem();

// Dismiss keyboard when enter/return key pressed
$(document).on('keypress', function (event) {
if (event.key == "Enter")
    document.activeElement.blur();
});

function addItem() {
  const item = `
  <div class="cell" id="item-${++itemCount}">
    <div class="cell-inner">` + 
    // ` <div class="cell-labels">
    //     <p class="cell-text" contenteditable="true">Item ${itemCount}</p>
    //   </div>` + 
    ` <p>
        <span class="section-header">Qty.</span>
        <span class="quantity" contenteditable="true" onblur="sortItems();">1</span>
      </p>
      <p>
        <span class="section-header">Pc.</span>
        $<span class="price" contenteditable="true" onblur="sortItems();">0.00</span>
      </p>
      <p>
        <span class="section-header">Ea.</span>
        $<span class="ea">0.00</span>
      </p>
      <button class="delete" onclick="removeItem(this);">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  </div>`;

  // Slide #content down to leave a placeholding gap for new item
  $("#content").css("transform", "translateY(45px)");
  
  // Perform after 200ms
  setTimeout(() => {
    $("#content").prepend(item);
    
    // Disable transition (temporarily) so #content will slide up without transition/animation
    $("#content").addClass("notransition");

    // Slide #content back up to remove placeholding gap
    $("#content").css("transform", "translateY(0px)");
  }, 200);

  // Re-enable transition
  $("#content").removeClass("notransition");
}

function removeItem(self) {
  const cell = self.parentNode.parentNode;
  const cellId = parseInt(cell.id.split("-")[1]);

  // Fade out current (to-be-deleted) cell
  $(`#content #item-${cellId}`).addClass("fade-out");

  // Slide components below and current cell up
  for (let i = 1; i <= cellId; i++)
    $(`#content #item-${i}`).css("transform", "translateY(-45px)");
  $("#add, .section-footer").css("transform", "translateY(-45px)");
  
  // Perform after 250ms
  setTimeout(() => {
    cell.remove();

    // Disable transition (temporarily) so components will slide up without transition/animation
    $(`#content div[id^=item], #add, .section-footer`).addClass("notransition");

    // Slide components back up to remove placeholding gap
    for (let i = 1; i <= cellId; i++)
      $(`#content #item-${i}`).css("transform", "translateY(0px)");
    $("#add, .section-footer").css("transform", "translateY(0px)");
  }, 250);

  // Re-enable transition
  $(`#content div[id^=item], #add, .section-footer`).removeClass("notransition");
}

function sortItems() {
  let cells = $(".cell");

  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    const id = cell.id;

    const quantity = parseFloat($(`#${id} .cell-inner .quantity`).text());
    const price = parseFloat($(`#${id} .cell-inner .price`).text());
    if (isNaN(quantity) || isNaN(price)) {
      alert("Invalid quantity/price.");
      return;
    }

    const pricePerUnit = price / quantity;
    $(`#${id} .cell-inner .ea`).text(pricePerUnit.toFixed(2));
  }

  // Sort by ascending order of .ea
  cells.sort(function(a, b) {
    const idA = a.id;
    const idB = b.id;
    const eaA = parseFloat($(`#${idA} .cell-inner .ea`).text());
    const eaB = parseFloat($(`#${idB} .cell-inner .ea`).text());
    return eaA - eaB;
  });

  const parent = cells.parent();
  cells.remove(); // Remove current cells
  parent.prepend(cells); // Add sorted cells
}
