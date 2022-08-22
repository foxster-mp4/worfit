var itemCount = 0;

$("#add").on("click", addItem);
loop(addItem, 5);
// addItem();

$("#compare").on("click", compare);

function addItem() {
  const item = `
  <div class="cell" id="item-${++itemCount}">
    <div class="cell-inner">
      <div class="cell-labels">
        <p class="cell-text" contenteditable="true">Item ${itemCount}</p>
      </div>
      <p><span class="section-header">Qty.</span><span contenteditable="true">1</span></p>
      <p><span class="section-header">Pc.</span>$<span contenteditable="true">0.00</span></p>
      <button class="delete" onclick="removeItem(this);">
        <i class="bi bi-trash"></i>
      </button>
    </div>
  </div>`;

  $("#content").css("transform", "translateY(46px)");
  
  setTimeout(() => {
    $("#content").prepend(item);
    $("#content").addClass("notransition")
    $("#content").css("transform", "translateY(0px)");
  }, 200);
  $("#content").removeClass("notransition")
}

function removeItem(self) {
  let cell = self.parentNode.parentNode;
  let cellId = parseInt(cell.id.split("-")[1]);

  for (let i = 1; i <= cellId; i++) {
    $(`#content #item-${i}`).css("transform", "translateY(-46px)");
  }
  $("#add").css("transform", "translateY(-46px)");
  $(`#content #item-${cellId}`).addClass("fadeout");
  
  // self.parentNode.parentNode.classList.add("fadeout")
  
  // $("#content").css("transform", "translateY(-46px)");
  
  setTimeout(() => {
    self.parentNode.parentNode.remove()
    // $("#content").css("transform", "translateY(0px)");
    $(`#content div[id^=item], #add`).addClass("notransition")
    for (let i = 1; i <= cellId; i++) {
      $(`#content #item-${i}`).css("transform", "translateY(0px)");
    }
    $("#add").css("transform", "translateY(0)");
    // $("#add").before(item);
  }, 250);
  // $("#content").removeClass("notransition");
  $(`#content div[id^=item], #add`).removeClass("notransition")
  
}

function compare() {
  console.log($(".cell"))
}

function loop(action, times) {
  for (let i = 1; i <= times; i++) {
    action();
  }
}
