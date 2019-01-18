<template>
  <div class="hold">
    <h3 class="title">
      Profile Picture
      <svg v-if="$auth.user().progress.pic" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 352.62 352.62" style="enable-background:new 0 0 352.62 352.62;" xml:space="preserve"><g><g><path d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664   c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648   c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704   c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145   C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611   c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g></svg>
    </h3>
    <div class="panel-body elevated">
      <div class="card-body">
        <div class="row">
          <div class="col-md-5">
            <div class="profile-pic-container">
              <img :src="url" class="img-thumbnail rounded" style="width:100%">
              <input type="file" name="pic" ref="pic" style="display:none;" @change="submit">
            </div>
          </div>
          <div class="col-md-1"></div>
          <div class="col-md-5">
            <p>Prepclass is a professional community of exceptional tutors. Upload your very best photo to attract clients to you. It must clearly show your face, and ensure you have a smile!</p>

            <p>
              <strong>PLEASE READ THIS FIRST! </strong>
            </p>
            <div>
              <p class="bold">Photo MUST be high quality, friendly and professional</p>
              <p class="bold">DON'T upload a passport, pdf, scanned or framed photo</p>
              <p class="bold">Photo must be bright and clear, NOT blurred or dark</p>
              <p class="bold">Photo background MUST look neat and presentable</p>
            </div>
            <div class="row">
              <div class="col mb-2">
                <button class="btn btn-success submit-button" :disabled="submitting" @click="selectFile">
                  Upload Photo
                  <i class="fa fa-circle-o-notch fa-spin" v-if="submitting"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import { mapMutations } from 'vuex';

export default {
  name: 'profile-picture',
  data() {
    return {
      submitting: false,
      url: this.$auth.user().profile_pic,
    };
  },
  methods: {
    ...mapMutations('profile', {
      updateProgress: 'UPDATE_PIC'
    }),
    selectFile() {
      this.$refs.pic.click();
    },
    submit() {
      if (this.$refs.pic.files[0]) {
        const data = new FormData();
        this.submitting = true;

        data.append('pic', this.$refs.pic.files[0]);
        this.$http
          .post(`${BASE_API}/v1/tutor/profile/pic`, data)
          .then((res) => {
            this.$auth.fetch();
            this.updateProgress();
            const data = res.data.data;
            this.url = data.url;
            swal({
              title: 'Success',
              text:
                'Your Profile was updated successfully. Click next to update your subjects and classes',
              icon: 'success',
              buttons: ['Cancel', 'Next ➜']
            }).then((value) => {
              if (value) {
                this.$emit('next');
              }
            });
          })
          .catch(() => {
            swal('Sorry', 'Something went wrong. please try again', 'danger');
          })
          .then(() => {
            this.submitting = false;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.hold {
  margin-top: 60px;
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
</style>