<template>
	<div class="list_places">  
	 
		<ul class="Item" v-for="place in places">
			<li  :class="{ visited: !place.visited, notvisited:  place.visited}">
				<div class="view">
					<div class="check">
						<input class="checkbox" type="checkbox" v-model="place.visited">
					</div>
					<div class="tbl">
						<table >
							<tr >
								<td>Название:</td>
								<td>{{ place.name }}</td>
							</tr>
							<tr>
								<td>Адрес: </td>
								<td>{{ place.addr }}</td>
							</tr>
						</table> 
					</div>
					<div class="btn">
						<button class="viewplace" @click="showLocation(place.addr)">Показать на карте</button>
						<button class="destroy" @click="removePlace(place)">Удалить</button>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'list',
	data () {
    	return {
     		places: this.$store.state.places, 
    	}
  	},
	computed:{ 
  	},
  	methods:{
  		removePlace: function (place) {
      		this.$store.dispatch('removePlace',  place)
	    },
	    showLocation: function(addr){ 
	    	this.$store.dispatch('showLocation',  addr)
	    }
  	}
}
</script>

<style scoped src="../style/list.css"></style>