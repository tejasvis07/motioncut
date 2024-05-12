document.addEventListener("DOMContentLoaded", function() {

    var dropdowns = document.querySelectorAll('.currency-select');
    var prices = document.querySelectorAll('.price');

    dropdowns.forEach(function(dropdown, index) {
      dropdown.addEventListener('change', function() {
        var selectedCurrency = this.value;
        prices[index].textContent = selectedCurrency + prices[index].textContent.substring(3);
      });
    });
  });
  