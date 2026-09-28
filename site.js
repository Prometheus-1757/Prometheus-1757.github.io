// Keep the last two words of each block of text together, so that no
// paragraph ends with a single word on its own line.
document.querySelectorAll('main p, main dd, main li, main h3, main small').forEach(function (el) {
  // Skip the arXiv/BibTeX link rows: BibTeX text must stay exactly as written.
  var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, {
    acceptNode: function (n) { return n.parentNode.closest('.links') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT; }
  });
  var nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  var seenWord = false;
  for (var i = nodes.length - 1; i >= 0; i--) {
    var text = nodes[i].nodeValue;
    for (var j = text.length - 1; j >= 0; j--) {
      if (!/\s/.test(text[j])) { seenWord = true; continue; }
      if (!seenWord) continue;
      var start = j;
      while (start > 0 && /\s/.test(text[start - 1])) start--;
      nodes[i].nodeValue = text.slice(0, start) + ' ' + text.slice(j + 1);
      return;
    }
  }
});
