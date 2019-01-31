<template>
  <div>
    <div class="row content-section">
      <div class="col-12 mb-5">
        <div class="panel w-100">
          <div class="panel-heading">
            <div class="panel-title">
              <small>You will be required to re-login after a successful password update </small>
              <div class="row">
                <div class="col-auto">
                    Personal Details
                </div>
                <div class="d-inline-block col mr-auto">
                </div>
                <div class="col-auto">
                  ID : {{$auth.user().former_id}}
                </div>
              </div>
            </div>
          </div>
          <form id="profileForm" @submit.prevent="submit" >
            <div class="panel-body">
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>Email Address *</label>
                </div>
                <div class="col" id="phone-container">
                  <b-form-input name="email" readonly id="email"  v-model="client.email"  v-validate.disable="'required'"></b-form-input>
                  <div class="invalid-feedback" v-show="errors.has('email')">{{errors.first('email')}}</div>
                  <small class="form-text text-muted">Your current Email Address</small>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>New Password *</label>
                </div>
                <div class="col" id="email-container">
                  <!-- <b-form-input name="password" :class="{'is-invalid' : errors.has('password')}"  id="password" v-validate.disable="'required|password|min:6|max:35'" ref="password" data-vv-as="password"  v-model="client.password" class="form-control" type="password"></b-form-input> -->
                  <small class="form-text text-muted">Please make sure this is a password you can remember</small>
                  <div class="invalid-feedback" v-show="errors.has('password')">{{errors.first('password')}}</div>
                <div :class="{'form-group': true, 'has-error': errors.has('password')}">
                    <label for="password" class="control-label">New password</label>
                    <input v-validate="'required|min:5|confirmed:password_confirmation'" type="password" class="form-control" id="password" name="password" placeholder="New Password" v-model="client.password">
                    <small class="help-block form-text text-muted" v-if="errors.has('password')">{{errors.first('password')}}</small>
                </div><!--end form group-->

                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>Confirm Password *</label>
                </div>
                <div class="col" id="email-container">
                    <div :class="{'form-group': true, 'has-error': errors.has('password_confirmation')}">
                        <label for="password_confirmation" class="control-label">Verify password</label>
                        <input v-validate="'required'" type="password" class="form-control" id="password_confirmation" name="password_confirmation" placeholder="Verify password" v-model="client.confirm_password">
                    </div>
                  <!-- <b-form-input name="confirm_password" :class="{'is-invalid' : errors.has('confirm_password')}"  v-model="client.confirm_password" id="confirm_password" data-vv-as="password"  v-validate.disable="'required|confirmed:$password'"    class="form-control" type="password"></b-form-input> -->
                  <!-- <small class="form-text text-muted">Please make sure this is a password you can remember</small> -->
                        <small class="invalid-feedback form-text text-muted" v-show="errors.has('confirm_password')">{{errors.first('confirm_password')}}</small>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <hr>
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-right">
                  <button @click.prevent="submit" :disabled="submitting" class="btn btn-success btn-lg">
                    Save
                    <i class="fa fa-circle-o-notch fa-spin" v-show="submitting"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VSelect from "vue-select";
import Editor from "vue-ckeditor2";
import { intersectionBy } from "lodash";
import swal from "sweetalert";
import { yearsBetween } from "@/lib/times";
import Spinner from "@/components/Preloaders/Spinner";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
  components: { VSelect, Editor, Spinner },
  name: "update-password",
  data() {
    return {
      submitting: false,
      client: {
        email: this.$auth.user().email,
        password: '',
        confirm_password: ''
      }
    };
  },

  methods: {
    submit() {
      this.$validator.validateAll().then(valid => {
        if (valid) {
          this.updatePassWord();
        } else {
          this.alertFormError();
        }
      });
    },
    updatePassWord() {
        this.$http
        .post(`${BASE_API}/v1/client/user/password`,{password:this.client.password})
        .then((response)=>{
            swal(
            "Password Successfully Updated",
            "You will be redirected back to login page. Click ok to proceed",
            "success"
            ).then((value) => {
                //this.logOut()
                console.log(this.$route);
                this.$router.go(0);
            })
        });
    },
    logOut() {
        this.$auth.logout({
            makeRequest: false,
            success: () => {
                this.$router.push({name: 'login'});
            },
            error() {
                console.log('error logging out ');
            },
        });
    },
    alertFormError() {
      swal(
        "Sorry",
        "There are some errors on the form. Please correct them and try again",
        "error"
      ).then(this.scrollToFirstError);
    },
    scrollToFirstError() {
      if (this.errors.items.length)
        document
          .querySelector(`[name=${this.errors.items[0].field}`)
          .scrollIntoView();
    },
  },
  mounted() {

  }
};
</script>
<style scoped lang="scss">
.content-section {margin-top: 40px}
.fade {
  &-enter,
  &-leave-to {
    opacity: 0;
  }
  &-enter-to,
  &-leave {
    opacity: 1;
  }
  &-active {
    transition: opacity 1.5s;
  }
}
</style>