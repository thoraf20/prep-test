<template>
  <auth-index>
    <p class="tagline">forgot your password</p>

    <form action="" @submit.prevent="validateAndSubmit">

      <div :class="['alert', 'alert-' + (success ? 'success' : 'info')]">{{success ? successMessage : instructions}}</div>

      <small class="form-text text-danger" v-show="errors.has('email')">{{errors.first('email')}}</small>
      <div class="input">
        <input class="browser-default" placeholder="Enter your email" type="email"  v-model="email" v-validate.disable="'required|email'">
      </div>

      <div class="input">
        <button type="submit" class="btn waves-effect waves-light primary white-text z-depth-0" :disabled="submitting">Send Reset Link <i class="fa fa-spin fa-circle-o-notch" v-show="submitting"></i></button>
      </div>
    </form>

    <p class="mr"><router-link :to="{ name: 'login' }" class="primary-text">Click here</router-link> to login</p>
  </auth-index>
</template>

<script>
import AuthIndex from "./AuthIndex";
import swal from "sweetalert";
export default {
  name: "login",
  components: { AuthIndex },
  data() {
    return {
      email: null,
      submitting: false,
      success: false,
      successMessage: "",
      instructions:
        "Enter your email address and we'll send you instruction on how to reset your password"
    };
  },
  methods: {
    async validateAndSubmit() {
      const valid = await this.$validator.validateAll();
      valid && this.submit();
    },
    submit(res) {
      const { email } = this;
      this.submitting = true;
      this.$http
        .post(BASE_API + "/v1/tutor/password/email", { email })
        .then(res => {
          this.success = true;
          this.successMessage = res.data.message;
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status == 422) {
              Object.keys(err.response.data.errors).forEach(item => {
                err.response.data.errors[item].forEach(message => {
                  this.errors.add(item, message);
                });
              });
            }
          }
        })
        .then(() => {
          this.submitting = false;
        });
    }
  }
};
</script>

<style scoped>
body {
  background: url("//*img*//pattern-bg2.png");
  /*background-color: rgba(255,255,0,1)*/
}
html {
  /*background: linear-gradient(90deg,#23edb6, #40d489);*/
  /*background: linear-gradient(90deg,#96fde0, #a3f5cc);*/
  background: #5f9048;
}
input.form-control {
  /*border:none;*/
}
input.form-control:focus {
  box-shadow: 0 0 0 2px #55ecbc;
}
</style>