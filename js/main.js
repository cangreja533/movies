jQuery(document).ready(function($) {
  //Llamado al Json
  $.get("data/data.json", function(data) {
    //Crear el html con el slider
    var slider = '';
    //Recorre los datos del slider
    $.each(data.slider, function(index, value) {
      var clase = 'carousel-item container';
      if (index == 0) {
        clase = 'carousel-item container active';
      }
      var item =
        `
      <div class="` + clase + `" style="background-image: url('` + value.imagen_banner + `');">
        <div class="row justify-content-start align-items-center">
          <div class="col-md-6">
            <div class="container-text-slider">
              <h2 class="title white">` + value.titulo + `</h2>
              <p class="white">` + value.sinopsis + `</p>
              <button class="btn amarillo">Watch Now</button>
              <button class="btn blanco">More info</button>
            </div>
          </div>
        </div>
      </div>
      `;
      slider = slider + item;
    });
    $('#slider').html(slider);

    //Recorre los datos las peliculas
    var peliculas = '';
    $.each(data.peliculas, function(index, value) {
      var item = `
      <div class="item" style="background-image: url('` + value.imagen_portada + `');"
        data-lanzamiento='` + value.lanzamiento + `'
        data-popular='` + value.popular + `'
        data-tendencia='` + value.tendencia + `'
        data-favoritos='` + value.favoritos + `'
        data-recomendado='` + value.recomendado + `'>
        <div class="fondo">
          <h2 class="title white">` + value.titulo + `</h2>
          <button class="btn amarillo">Watch Now</button>
          <button class="btn blanco">More info</button>
        </div>
      </div>
      `;
      peliculas = peliculas + item;
    });
    $('#cartelera').html(peliculas);
    $('#cartelera').isotope();

    //Atender eventos de filtros
    $('#filtro span').on('click', function() {
      var filtro = $(this).attr('data-filter');
       $('#filtro li.active').removeClass('active');
       $(this).parent().addClass('active');

      if (filtro == 'all') {
        $('#cartelera').isotope({
          filter: '*'
        });
      } else if (filtro == 'lanzamiento') {
        $('#cartelera').isotope({
          filter: '[data-lanzamiento=true]'
        });
      }
      else if (filtro == 'popular') {
        $('#cartelera').isotope({
          filter: '[data-popular=true]'
        });
      }
      else if (filtro == 'tendencia') {
        $('#cartelera').isotope({
          filter: '[data-tendencia=true]'
        });
      }else if (filtro == 'favoritos') {
        $('#cartelera').isotope({
          filter: '[data-favoritos=true]'
        });
      }
      else if (filtro == 'recomendado') {
        $('#cartelera').isotope({
          filter: '[data-recomendado=true]'
        });
      }
    });
  });
});
