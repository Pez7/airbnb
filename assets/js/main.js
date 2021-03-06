 $(document).ready(function() {

     $('select').material_select();

     /* Mapa*/





     //Local storage datos fechas llegada

     var llegadaGuardada = $("#llegada").text(localStorage.getItem("llegada"));
     $(".entrada").append(llegadaGuardada);

     //tomar datos y q aparezcan en inputs search



     //tomar datos de los checkbox

     var $filterCheckboxes = $('.filter-checkboxes');

     $filterCheckboxes.on('change', function() {

         var selectedFilters = {};

         $filterCheckboxes.filter(':checked').each(function() {

             if (!selectedFilters.hasOwnProperty(this.name)) {
                 selectedFilters[this.name] = [];
             }

             selectedFilters[this.name].push(this.value); // esto crea selected filters

         });

     });




 });

 var map;
 var miUbicacion;
 var latitud, longitud;

 function initMap() {
     map = new google.maps.Map(document.getElementById("map"), {
         zoom: 5,
         center: { lat: -9.1191427, lng: -77.0349046 },
         mapTypeControl: false,
         zoomControl: false,
         streetViewControl: false
     });

     function initialize() { //autocompletar direcciones
         var inputDestino = document.getElementById('destino');
         console.log(destino);
         var autocompletados = new google.maps.places.Autocomplete(inputDestino);
     }
     google.maps.event.addDomListener(window, 'load', initialize);
 };

 /* Geocoder es el que convierte el nombre de ciudad a coordenadas, si es exitoso, entonces llamara a la funcion "mostrarDestino", insertando como parametro results[0], que es un objeto array donde estan las coordenadas.*/
 document.getElementById("destinoBoton").addEventListener("click", function() {
     var positionString = document.getElementById('destino').value;
     var geocoder = new google.maps.Geocoder();
     geocoder.geocode({ 'address': positionString }, function(results, status) {
         if (status == google.maps.GeocoderStatus.OK) {
             mostrarDestino(results[0]);
         } else {
             alert("Something got wrong " + status);
         }
     });
 });

 /* Esta funcion, toma el parametro insertado "posicion" y llama a las funciones geometry.location.lat y geometry.location.lng para obtener las coordenadas. Estas funciones son propias de la api proporcionada por google.*/
 function mostrarDestino(posicion) {
     //Variable pos finalmente es la que toma las coordenadas de posicion.
     var pos = {
         lat: posicion.geometry.location.lat(),
         lng: posicion.geometry.location.lng()
     };
     console.log(pos);
     miUbicacion = new google.maps.Marker({
         position: pos,
         map: map
     });
     map.setZoom(12);
     map.setCenter(pos);
 };