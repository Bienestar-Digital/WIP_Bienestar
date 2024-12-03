// Componente del Buscador
import React, { useEffect } from 'react';
import $ from 'jquery';

const Buscador = () => {
  useEffect(() => {
    // Código del buscador de Google
    var cx = '008572255874373046644:chip1p1uf-4';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = (document.location.protocol === 'https:' ? 'https:' : 'http:') +
      '//www.google.com/cse/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);

    // Función para modificar el placeholder del input
    /* function checkBck() {
      $(".gsc-input input").attr("placeholder", "Buscar en la Universidad");
      if (!$(".gsc-search-button input").attr("src")) {
        window.setTimeout(function () {
          checkBck();
        }, 100);
      }
    }
    checkBck(); */   
    /* $('input.gsc-input').attr('placeholder', 'custom text here'); */
    /* $(window).on("onload",function() {
    document.getElementById('gsc-i-id1').placeholder = "Buscar en la Universidad";
    document.getElementById("gsc-i-id1").setAttribute("placeholder", "SEARCH");
    }); */
    
    
    
    

    // Resto del código de jQuery
    /* $(document).on('ready',function () {
      $('#unalOpenMenuServicios, #unalOpenMenuPerfiles').on('click',function(e) {
        var $target = $(this).data('target');
        var $mOffset = $(this).offset();
        $($target)
          .css({ top: $mOffset.top + $(this).outerHeight(), left: $mOffset.left })
      });
      function serviceMenuStatus() {
        var $s = $('#services');
        $s.height($(window).height());
        $('ul', $s).height($(window).height());
        
        if ($('.indicator', '#services').hasClass('active')) {
          $s.css({ 'right': 0 });
        } else {
          $s.css({ 'right': parseInt($('#services').width()) * -1 });
        }
      }
      
      $('.indicator', '#services').on('click',function() {
        $(this).toggleClass('active');
        serviceMenuStatus();
      });
      
      $(window).on("resize",function() {
        $('.open').removeClass('open');
        if ($(window).width() > 767) {
          $('#services').css({ 'right': parseInt($('#services').width()) * -1, left: 'auto', top: 'auto' });
          $('#bs-navbar').removeClass('in')
          serviceMenuStatus();
        } else {
          $('.indicator', '#services').removeClass('active');
        }  
      });
      $('#services').css({ 'right': parseInt($('#services').width()) * -1 })
      serviceMenuStatus();
    }); */
  }, []);

  return null;
};

export default Buscador;