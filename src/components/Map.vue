<template> <div>
		<div id="ymap"></div> 
    </div>
</template>

<script>
function initmap(map){
      map = new ymaps.Map("ymap", {
        center: [59.939095, 30.315868],
        zoom: 10
      }) 
      return map
}
function viewMarker(map, addr ){ 
  ymaps.geocode(addr, {
        results: 1
    }).then(function (res) {
            const firstGeoObject = res.geoObjects.get(0),
                bounds = firstGeoObject.properties.get('boundedBy');
            map.setBounds(bounds, {
                checkZoomRange: true
            })
   })
} 
function mapload(map, places ){  
  map.geoObjects.removeAll()
  for (const item of places){
    const color = 'islands#greenStretchyIcon',
      status = '<p> Статус: Вы еще не посетили это место!',
      ballon = '';
    if (item.visited==true){ 
      color= 'islands#redStretchyIcon'
      status = '<p> Статус: Вы посетили это место!'
    }
    ballon = 'Название: '+item.name+'<p> Адрес: '+item.addr + status
    ymaps.geocode(item.addr, {
      results: 1
    }).then(function (res) {
      const firstGeoObject = res.geoObjects.get(0),
      coords = firstGeoObject.geometry.getCoordinates();
      const Placemark = new ymaps.Placemark(coords, {
        iconContent: '',
        balloonContent: ballon
      }, {
        preset: color
       })
       map.geoObjects.add(Placemark) 
    })  
  }
} 
export default {
  name: 'map',
  data () {
      return {
        state: this.$store.state,
        places: this.$store.state.places,
        map: '' ,
        viewPlace: this.$store.state.viewPlace 
      }
  },
  created() {
      ymaps.ready(() => {
      this.map = initmap(this.map) 
      mapload(this.map,this.places) 
    })
  }, 
  watch: {
    state: {
      handler: function (state) {  
        this.viewPlace = this.$store.state.viewPlace  
      },
      deep: true
    },
    places: {
      handler: function (places) {   
      mapload(this.map, places) 
      },
      deep: true
    },
    viewPlace: {
      handler: function(viewPlace){
        viewMarker(this.map, viewPlace)
        this.$store.dispatch('clearView') 
      } 
    } 
  },
   
}
</script>

<style scoped src="../style/map.css"></style>
