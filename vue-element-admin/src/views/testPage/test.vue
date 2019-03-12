<template>
  <div class="testPage-container">
    {{ userinfo }}
  </div>
</template>

<script>
import axios from 'axios'

const API_URL = 'http://192.168.3.116/api/getAllUser'

export default {
  data() {
    return {
      userinfo: null,
      listLoading: true
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.listLoading = true
      axios.get(API_URL).then(response => {
        this.userinfo = response.data
        console.log(response.data)
        this.listLoading = false
      })
    }
  }
}
</script>

