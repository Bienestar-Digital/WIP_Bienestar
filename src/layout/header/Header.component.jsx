// Componente GoogleAnalytics
import React from 'react';

const GoogleAnalytics = () => {
  // Código de Google Analytics
  (function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
      (i[r].q = i[r].q || []).push(arguments);
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m);
  })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
  

  // Configuración y envío de datos de seguimiento
  window.ga('create', 'UA-103604739-1', 'auto');
  window.ga('send', 'pageview');

  return null;
};

export default GoogleAnalytics;