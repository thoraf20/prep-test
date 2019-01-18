<template>
  <div class="hold">
    <h3 class="title">
      Government Issued License
      <svg v-if="$auth.user().progress.identity" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 352.62 352.62" style="enable-background:new 0 0 352.62 352.62;" xml:space="preserve"><g><g><path d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664   c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648   c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704   c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145   C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611   c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g></svg>
    </h3>
    <div class="panel-body elevated py-6">
      <div class="row">
        <div class="d-block text-center col-md-5">
          <span>
            <vue-dropzone ref="myVueDropzone" id="dropzone" @vdropzone-complete="afterComplete" @vdropzone-sending="addAuthHeader" v-bind:headers="headers" :options="dropzoneOptions"></vue-dropzone>
          </span>
        </div>
        <div class="col-md-1"></div>
        <div class="col-md-5">
          <span>*Upload one of the following (verification)*</span>
          <ul>
            <li class="bold"><i class="zmdi zmdi-check"></i> National ID Card</li>
            <li class="bold"><i class="zmdi zmdi-check"></i> Drivers License</li>
            <li class="bold"><i class="zmdi zmdi-check"></i> Voters Card</li>
          </ul>
          <div class="row">
            <div v-if='images.length == 0' style="color:red">You haven't added a verification ID yet. Click on Add New to Do so</div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';

export default {
  name: 'identity-verification',
  components: {
    vueDropzone: vue2Dropzone,
  },
  mounted() {
    this.$refs.myVueDropzone.setOption('headers.Authorization', 'Bearer:' + this.$auth.token());
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      dropzoneOptions: {
        url: BASE_API + '/v1/tutor/profile/verify',
        thumbnailWidth: 200,
        addRemoveLinks: true,
        dictDefaultMessage: "<i class='zmdi zmdi-cloud-upload' style='font-size:35px'></i><br>Drag Picture Here or Click Me.",
      },
      images: [],
      apiUrl: BASE_API + '/v1/tutor/profile/verify',
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
      this.$auth.fetch();
      this.fetchImages();
      this.$emit('next');
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

            var url = BASE_API + '/v1/tutor/profile/' + id + '/verify'
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
};
</script>

<style lang="scss" scoped>
.hold {
  margin: 60px 0;
}
.panel-body {
  padding: 10px !important;
}
.elevated {
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(150,150,150,0.14), 0 3px 1px -2px rgba(150,150,150,0.12), 0 1px 5px 0 rgba(150,150,150,0.2);
}
.submit-button {
  width: 130px;
  height: 38px;
  line-height: 38px;
  padding: 0 10px;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
  vertical-align: middle;
  box-shadow: 0 2px 2px 0 rgba(40, 167, 69, 0.14), 0 3px 1px -2px rgba(40, 167, 69, 0.12), 0 1px 5px 0 rgba(40, 167, 69, 0.2);
  // float: right;
  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
    &:active {box-shadow: none !important;}
  }
}
.title {
  svg {
    float: right;
    height: 18px;
    width: 18px;
    margin: 0 15px;
  }
}
.bold {font-weight: 600; margin: 10px 0;}
.py-6 {padding: 35px 0 !important;}
</style>
