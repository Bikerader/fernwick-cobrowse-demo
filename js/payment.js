// Client-side only: formats and checks the demo card fields. Nothing is sent or stored.
(function () {
  var SUBTOTAL = 217;
  var num = document.getElementById('cc-number');
  var exp = document.getElementById('cc-exp');
  var cvv = document.getElementById('cc-cvv');
  var brand = document.getElementById('cc-brand');
  var shipping = document.getElementById('shipping');
  var notice = document.getElementById('payment-notice');

  function detectBrand(d) {
    if (/^4/.test(d)) return 'Visa';
    if (/^(5[1-5]|2[2-7])/.test(d)) return 'Mastercard';
    if (/^3[47]/.test(d)) return 'American Express';
    if (/^6(011|5)/.test(d)) return 'Discover';
    return '';
  }

  function luhn(d) {
    var sum = 0, alt = false;
    for (var i = d.length - 1; i >= 0; i--) {
      var n = +d[i];
      if (alt) { n *= 2; if (n > 9) n -= 9; }
      sum += n;
      alt = !alt;
    }
    return d.length >= 13 && sum % 10 === 0;
  }

  num.addEventListener('input', function () {
    var d = num.value.replace(/\D/g, '').slice(0, 19);
    var b = detectBrand(d);
    num.value = b === 'American Express'
      ? d.replace(/^(\d{0,4})(\d{0,6})(\d{0,5}).*/, function (_, a, c, e) { return [a, c, e].filter(Boolean).join(' '); })
      : d.replace(/(\d{4})(?=\d)/g, '$1 ');
    brand.textContent = b || ' ';
  });

  exp.addEventListener('input', function () {
    var d = exp.value.replace(/\D/g, '').slice(0, 4);
    exp.value = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d;
  });

  cvv.addEventListener('input', function () {
    cvv.value = cvv.value.replace(/\D/g, '');
  });

  shipping.addEventListener('change', function () {
    var s = +shipping.value;
    document.getElementById('ship-cost').textContent = '$' + s.toFixed(2);
    document.getElementById('total').textContent = '$' + (SUBTOTAL + s).toFixed(2);
  });

  document.getElementById('payment-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var d = num.value.replace(/\D/g, '');
    var m = exp.value.match(/^(\d{2})\/(\d{2})$/);
    var errors = [];
    if (!document.getElementById('cc-name').value.trim()) errors.push('name on card');
    if (!luhn(d)) errors.push('a valid card number');
    if (!m || +m[1] < 1 || +m[1] > 12) errors.push('an expiry in MM/YY format');
    if (cvv.value.length < 3) errors.push('a 3 or 4 digit CVV');

    notice.classList.add('show');
    if (errors.length) {
      notice.style.background = '#fde8e8';
      notice.style.color = '#8a1f1f';
      notice.textContent = 'Please enter ' + errors.join(', ') + '.';
      return;
    }
    notice.style.background = '';
    notice.style.color = '';
    var order = 'FW-' + Math.floor(100000 + Math.random() * 900000);
    notice.textContent = 'Test order ' + order + ' placed with ' + (detectBrand(d) || 'card') +
      ' ending ' + d.slice(-4) + '. No payment was processed.';
    e.target.reset();
    brand.textContent = ' ';
  });
})();
