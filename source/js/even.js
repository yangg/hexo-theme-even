'use strict'

/* eslint-disable */
// https://uedsky.com/demo/src/polyfills/document.scrollingElement.js
document.scrollingElement||function(){function e(){if(t)return t;if(document.body.scrollTop)return t=document.body;var e=document.createElement("iframe");e.style.height="1px",document.documentElement.appendChild(e);var n=e.contentWindow.document;n.write('<!DOCTYPE html><div style="height:9999em">x</div>'),n.close();var o=n.documentElement.scrollHeight>n.body.scrollHeight;return e.parentNode.removeChild(e),t=o?document.documentElement:document.body}var t=null;Object.defineProperty(document,"scrollingElement",{get:e})}();
/* eslint-enable */

(function () {
  var $ = document.querySelector.bind(document)
  var $$ = document.querySelectorAll.bind(document)

  var back2top = $('#back2top')
  // show back2top if scrollTop >= 100
  document.addEventListener('scroll', function () {
    var scrollTop = document.scrollingElement.scrollTop
    back2top.style.cssText = scrollTop >= 100 ? 'opacity: 1;' : ''
  }, false)

  // smooth scroll
  back2top.addEventListener('click', function () {
    if ('scroll-behavior' in document.documentElement.style) {
      window.scrollTo(0, 0)
    } else {
      // TODO:
      window.scrollTo(0, 0)
    }
  }, false)

  var sidebar = $('#sidebar')
  if (!sidebar) { return }
  var postContent = $('.post-content')
  var minTop = sidebar.offsetTop
  var maxTop = minTop + postContent.offsetHeight + 18 - sidebar.offsetHeight
  document.addEventListener('load', function () { // update maxTop after images loaded
    maxTop = minTop + postContent.offsetHeight + 18 - sidebar.offsetHeight
  }, false)

  var headerLinks = $$('.headerlink')
  var tocLinks = $$('.toc-link')

  // sticky sidebar
  document.addEventListener('scroll', function () {
    var scrollTop = document.scrollingElement.scrollTop
    if (scrollTop > maxTop) {
      sidebar.style.cssText = 'position: absolute; top: ' + maxTop + 'px'
    } else if (scrollTop > minTop) {
      sidebar.style.cssText = 'position: fixed; top: 10px'
    } else {
      sidebar.style.cssText = ''
    }

    // sidebar scrollspy
    for (var i = 0, len = headerLinks.length; i < len; i++) {
      var offsetTop = headerLinks[i].offsetTop - 20 // headerLink margin 20
      var offsetBottom = i + 1 === len ? Infinity : headerLinks[i + 1].offsetTop - 20
      if (scrollTop >= offsetTop && scrollTop < offsetBottom) {
        tocLinks[i].classList.add('active')
      } else {
        tocLinks[i].classList.remove('active')
      }
    }
  }, false)
})()
