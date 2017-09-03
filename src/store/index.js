import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const STORAGE_KEY = 'vue-app'

const placeStorage = {
  	load: function () {
    	const places = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    	for (const index in places)
			    places.id = index
    	placeStorage.uid = places.length
    	return places
  	},
  	save: function (places) {
    	localStorage.setItem(STORAGE_KEY, JSON.stringify(places))
  	}
} 
const store = new Vuex.Store({
	state: {
		places: placeStorage.load(),   
    	viewPlace: '' 
	},  
	mutations: {
		placeStorageSave(state, places){
			placeStorage.save(places)
		},
		add(state, place){
			const name = place.newname.trim()
		    const addr = place.newaddr.trim()
		    if (!name || !addr) {
		        return
		    } 
		    state.places.push({
		      	id: placeStorage.uid++,
		        name: name,
		        addr: addr,
		        visited: false 
		    })	 
		    state.viewPlace = addr 
		    placeStorage.save(state.places)
		},
		removePlace(state, place){
	      	state.places.splice(state.places.indexOf(place), 1)
	      	state.viewPlace = ''
		},
		showLocation(state, addr){
			 state.viewPlace = addr  
		},
		clearView(state){
			 state.viewPlace = ''  
		}
	},
	actions:{
		placeStorageSave({ commit }, places){
			commit('placeStorageSave', places)
		},
		add({ commit }, newPlace){
			commit('add', newPlace )
		},
		removePlace({ commit }, place){
			commit('removePlace', place)
		},
		showLocation({ commit }, addr){
			commit('showLocation',addr)
		},
		clearView({ commit }){
			commit('clearView' )
		}
	}
})

export default store