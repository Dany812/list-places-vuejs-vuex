<template>  
	<div class="addplace">
      <form id="addplace" v-on:submit.prevent="add">
        <ul>
          <li>
            <h3>Добавление места</h3>
          </li>
          <li>
          <label for="new-name">Название: </label>
            <input class="new-place"
            autocomplete="off"
            placeholder="Название"
            v-model="newplace.newname"
            name="new-name"
            required>

          </li>
          <li>
            <label for="new-addr">Адрес: </label>
            <input class="new-place"
            autocomplete="off"
            placeholder="Адрес"
            v-model="newplace.newaddr"
            name="new-addr"
            required>
          </li>
            <input type="submit" class="add_btn"  value="Добавить">
        </ul>
    </form>
	</div>
</template>

<script>


export default {
  name: 'add',
  data () {
    return {
     places: this.$store.state.places, 
     newplace: { newname: [], newaddr: [] }
    }
  },
  watch: {
    places: {
      handler: function (places) { 
        this.$store.dispatch('placeStorageSave', places)
      },
      deep: true
    }
  },
  methods: {
    add() {
      if (!this.newplace.newname.trim() || !this.newplace.newaddr.trim()) {
            return
        }
      this.$store.dispatch('add',  this.newplace) 
      this.newplace.newname = '',
      this.newplace.newaddr = ''
    },
  }
}
</script>

<style scoped src="../style/add.css"></style>
 