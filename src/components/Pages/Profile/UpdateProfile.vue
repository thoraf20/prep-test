<template>
  <div>
    <div class="row content-section">
      <div class="col-12 mb-5">
        <div class="panel w-100">
          <div class="panel-heading">
            <div class="panel-title">
              <div class="row">
                <div class="col-auto">My Profile</div>
                <div class="d-inline-block col mr-auto"></div>
                <div class="col-auto">ID : {{$auth.user().former_id}}</div>
              </div>
            </div>
          </div>
          <form id="profileForm" @submit.prevent="submit">
            <div class="panel-body">
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>Name *</label>
                </div>
                <div class="col" id="phone-container">
                  <b-form-input
                    name="email"
                    id="email"
                    v-model="client.name"
                    v-validate.disable="'required'"
                  ></b-form-input>
                  <div
                    class="invalid-feedback"
                    v-show="errors.has('email')"
                  >{{errors.first('email')}}</div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>Email Address *</label>
                </div>
                <div class="col" id="phone-container">
                  <b-form-input
                    name="email"
                    type="email"
                    id="email"
                    v-model="client.email"
                    v-validate.disable="'required'"
                  ></b-form-input>
                  <div
                    class="invalid-feedback"
                    v-show="errors.has('email')"
                  >{{errors.first('email')}}</div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>Phone Number *</label>
                </div>
                <div class="col" id="phone-container">
                  <b-form-input
                    name="email"
                    type="telephone"
                    id="email"
                    v-model="client.phone"
                    v-validate.disable="'required'"
                  ></b-form-input>
                  <div
                    class="invalid-feedback"
                    v-show="errors.has('email')"
                  >{{errors.first('email')}}</div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-md-right">
                  <label>Address *</label>
                </div>
                <div class="col" id="phone-container">
                  <b-form-textarea
                    name="email"
                    id="email"
                    v-model="client.address"
                    v-validate.disable="'required'"
                  ></b-form-textarea>
                  <div
                    class="invalid-feedback"
                    v-show="errors.has('email')"
                  >{{errors.first('email')}}</div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <hr>
                </div>
              </div>
              <div class="row">
                <div class="col-12 text-right">
                  <button
                    @click.prevent="submit"
                    :disabled="submitting"
                    class="btn btn-success btn-lg"
                  >
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
  name: "update-profile",
  data() {
    return {
      submitting: false,
      client: {
        name: this.$auth.user().name,
        email: this.$auth.user().email,
        phone: this.$auth.user().phone,
        address: this.$auth.user().address,
        location: this.$auth.user().location.name,
        state: this.$auth.user().state.name,
        password: "",
        confirm_password: ""
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
        .post(`${BASE_API}/v1/client/user/profile`, this.buildData())
        .then(response => {
          swal(
            "Profile Successfully Updated",
            "This page would reload to update your details on your dashboard",
            "success"
          ).then(value => {
            this.$forceUpdate();
            this.$router.go(0);
          });
        });
    },
    logOut() {
      this.$auth.logout({
        makeRequest: false,
        success: () => {
          this.$router.push({ name: "login" });
        },
        error() {
          console.log("error logging out ");
        }
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
    buildData() {
      var data = {
        name: this.client.name,
        email: this.client.email,
        phone: this.client.phone,
        address: this.client.address
      };
      return data;
    }
  },
  mounted() {}
};
</script>
<style scoped lang="scss">
.content-section {
  margin-top: 40px;
}
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