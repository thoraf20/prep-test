<template>
  <div class="container">
    <b-modal ref="myModalRef" hide-footer title="Add a Photo or Video">
      <div class="d-block text-center">
        <h3>Drag and Drop Photo Here</h3>
        <br>
        <span>
            <vue-dropzone ref="myVueDropzone" id="dropzone" @vdropzone-complete="afterComplete" @vdropzone-sending="addAuthHeader" v-bind:headers="headers" :options="dropzoneOptions"></vue-dropzone>
          </span>
      </div>
    </b-modal>
    <span v-if="images.length !==0">Recently Added</span>
    <div class="row">
      <div v-if='images.length == 0'>There are no Uploads yet, click Add New to add Picture</div>
      <div v-else class="col-sm-6 col-lg-3 photo-upload-col" v-for='(image, index) in images'>
        <div class="img">
          <img :src="image.image_url" class="photo-upload">
          <div class="overlay">
            <div class="text">
              <i class="zmdi zmdi-close-circle-o" @click="removePhoto(image.public_id)" style="color:white; font-size:30px"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <br><br>
    <div class="col float-right">
      <button class="btn btn-outline float-right" @click="showModal">Add New</button>
    </div>
  </div>
</template>
<script>
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
export default {
  name: 'Photos',
  components: {
    vueDropzone: vue2Dropzone
  },
  mounted() {
    this.$refs.myVueDropzone.setOption('headers.Authorization', 'Bearer:' + this.$auth.token())
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      dropzoneOptions: {
        url: BASE_API + '/v1/tutor/profile/photo',
        thumbnailWidth: 200,
        addRemoveLinks: true,
        dictDefaultMessage: "<i class='zmdi zmdi-cloud-upload' style='font-size:35px'></i><br>Drag Picture Here or Click Me.",
      },
      images: [],
      apiUrl: BASE_API + '/v1/tutor/profile/photo',
    }
  },
  computed: {
    headers() { return 'Bearer ' + this.$auth.token() }
  },
  mounted() {
    this.fetchImages()
  },
  methods: {
    addAuthHeader(file, xhr, formData) {
      xhr.setRequestHeader('Authorization', this.headers)
    },
    showModal() {
      this.$refs.myModalRef.show()
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    },
    afterComplete(file) {
      console.log(file);
      this.fetchImages()
    },
    async removePhoto(id) {
      swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this photo!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
          closeModal: false,
        })
        .then((willDelete) => {
          if (willDelete) {

            var url = BASE_API + '/v1/tutor/profile/' + id + '/photo'
            this.$http.delete(url)
              .then((response) => {
                console.log(response)
                swal(`Poof! ${response.data}`, {
                  icon: "success",
                });
                this.fetchImages()
              })
              .catch((error) => {
                console.log(error)
              })
          } else {
            // swal("Your imaginary file is safe!");
            return false
          }
        });
    },
    fetchImages() {
      this.$http.get(this.apiUrl)
        .then((response) => {
          console.log(response)
          this.images = response.data.data
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}

</script>
