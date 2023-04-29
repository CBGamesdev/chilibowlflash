document.addEventListener('DOMContentLoaded', function(){
  var style = `#button {
  display:none;
}
.imgb_vis {
  animation: imgb-animation 7s linear;
}
@keyframes imgb-animation {
  10% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(100px);
  }
  90% {
    transform: translateX(100px);
  }
  100% {
    transform: translateX(0);
  }
}`;
  addStyle(style);

  var div = document.createElement('div');
  div.id = 'button';
  div.className = 'imgb';
  div.style = 'position:fixed;top:10%;left:-100px;z-index:10';
  div.innerHTML = '<a target="_blank" href="https://sites.google.com/view/classroom6x/" title="More of best Unblocked Games"><img src="https://lh4.googleusercontent.com/lUEWrXMVEr4AdjKISyJahDRJ61bwfvHdpeYm86Djn5U8oCm9dI60NGXSBqad9HUvzTXgqlkosA_hWV-VuXPjzrkGvh3_kNSgYk8ySWzXnDpbBCBiooyBbU8oBy3YBZMDkW8RcRVmDuC0raoeqZBm8kBlqs6c5mdfkJeN2aE68lXS_lcOZ5_F7lIuM6qLVg" width="100" height="30" style="cursor:pointer;" alt="More Unblocked Games"></a>';
  document.body.appendChild(div);

  var image = document.getElementById('button');
  var i = 0;
  var s = ['block', 'none'];
  var t = [7000, 100000];
  show();

  document.querySelector('.imgb').classList.add('imgb_vis');

  function addStyle(styles) {
    var css = document.createElement('style');
    css.type = 'text/css';

    if (css.styleSheet) {
      css.styleSheet.cssText = styles;
    } else {
      css.appendChild(document.createTextNode(styles));
    }

    document.getElementsByTagName('head')[0].appendChild(css);
  }

  function show() {
    i ^= 1;
    image.style.display = s[i];
    setTimeout(show, t[i]);
  }
});
