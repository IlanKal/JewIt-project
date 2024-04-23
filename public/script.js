$(document).ready(function () {
    var scrollThreshold = 200;
    var popupClosed = localStorage.getItem('popupClosed');

    // Check if the popup has been closed before
    if (!popupClosed) {
        // If not, show the popup and set a flag in local storage
        $(window).scroll(function () {
            if ($(this).scrollTop() > scrollThreshold) {
                $('#popup').fadeIn();
            } else {
                $('#popup').fadeOut();
            }
        });

        $('#closePopup').click(function () {
            $('#popup').fadeOut();
            // Set a flag in local storage to indicate that the popup has been closed
            localStorage.setItem('popupClosed', 'true');
        });
    }
});

 src="https://cdn.jsdelivr.net/npm/flatpickr">
      flatpickr('#date', {
        dateFormat: 'Y-m-d',
      });
   

//hebcal-shabbat
fetch('https://www.hebcal.com/shabbat?cfg=i2&geonameid=281184&M=on&lg=s&tgt=_top')
  .then(response => response.text())
  .then(data => document.getElementById('hebcal-shabbat').innerHTML = data);


  //Pop-up


