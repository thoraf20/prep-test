<template>
  <auth-index>
    <p class="tagline">register as a prepclass tutor</p>
    <!-- <div class="mb-2">
      <div class="alert alert-success">
        <p>Welcome to Prepclass Home - Tutor Application Form. Please fill this form if you are interested in becoming a home tutor with Prepclass. All questions are compulsory.</p>
        <p>
          Call
          <a href="tel:09031818368">09031818368</a> or
          <a href="tel:09082405450">09082405450</a>
          for questions. PLEASE DO NOT FILL THIS FORM MORE THAN ONCE. Prospective tutors SHOULD NOT use Opera Mini to fill the form or we may not capture your details. Please use another browser preferably Google Chrome or Firefox!
        </p>
      </div>
    </div> -->

    <!-- <b-form @submit.prevent="validateAndSubmit">
      <b-form-group label="Your Name">
        <b-form-input type="text" v-validate="'required'" name="name" v-model="tutor.name">
        </b-form-input>
        <span class="form-text text-danger" v-show="errors.has('name')">{{errors.first('name')}}</span>
      </b-form-group>

      <b-form-group label="Email">
        <b-form-input type="email" v-validate="'required|email'" name="email" v-model="tutor.email">
        </b-form-input>
        <span class="form-text text-danger" v-show="errors.has('email')">{{errors.first('email')}}</span>
      </b-form-group>
      <b-form-group label="Phone Number">
        <b-form-input type="text" v-validate="'required'" name="phone" v-model="tutor.phone">
        </b-form-input>
        <span class="form-text text-danger" v-show="errors.has('phone')">{{errors.first('phone')}}</span>
      </b-form-group>
      <b-form-group label="Gender">
        <b-form-select :options="genderOptions" v-validate="'required'" name="gender" v-model="tutor.gender">
        </b-form-select>
        <span class="form-text text-danger" v-show="errors.has('gender')">{{errors.first('gender')}}</span>

      </b-form-group>
      <div class="form-group">
        <label for="" class="col-form-label">Password</label>
        <div class="input-group">
          <input class="form-control" name="password" v-validate="'required'" :type="passwordType" @focus="showPassword = true" @blur="showPassword = false" v-model="tutor.password">
          <div class="input-group-append">
            <button class="btn btn-light" style="border:1px solid #bbb; border-left:none;" type="button" @click="showPassword = !showPassword">
              <i :class="['fa', `fa-eye${!showPassword ? '-slash' : ''}`]"></i>
            </button>
          </div>
        </div>
        <span class="form-text text-danger" v-show="errors.has('password')">{{errors.first('password')}}</span>
      </div>
      <b-button type="submit" variant="success" :disabled="submitting">Submit
        <i class="fa fa-spin fa-circle-o-notch" v-show="submitting"></i>
      </b-button>
      <router-link class="btn btn-link" :to="{name:'login'}">Have account ? Login</router-link>
    </b-form> -->
    <form action="" @submit.prevent="validateAndSubmit">

      <small class="form-text text-danger" v-show="errors.has('name')">{{errors.first('name')}}</small>
      <div class="input">
        <input class="browser-default" placeholder="Enter your name" type="text"  v-model="tutor.name" v-validate="'required'">
      </div>

      <small class="form-text text-danger" v-show="errors.has('email')">{{errors.first('email')}}</small>
      <div class="input">
        <input class="browser-default" placeholder="Enter your email" type="email"  v-model="tutor.email" v-validate="'required|email'">
      </div>

      <small class="form-text text-danger" v-show="errors.has('phone')">{{errors.first('phone')}}</small>
      <div class="input">
        <input class="browser-default" placeholder="Enter your phone number" type="text"  v-model="tutor.phone" v-validate="'required'">
      </div>

      <small class="form-text text-danger" v-show="errors.has('gender')">{{errors.first('gender')}}</small>
      <div class="input">
        <select name="gender" v-model="tutor.gender" v-validate="'required'">
          <option value="" selected disabled>Enter your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <small class="form-text text-danger" v-show="errors.has('password')">{{errors.first('password')}}</small>
      <div class="input">
        <input class="browser-default" placeholder="Enter your password" type="password" v-model="tutor.password" v-validate="'required'">
        <span class="abs"><svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.74056 16.5588C4.60301 15.5994 2.81768 13.9598 1.55458 12.0044C2.70837 10.2191 4.28724 8.68876 6.18189 7.71715C5.69608 8.54302 5.44103 9.49034 5.44103 10.4498C5.44103 12.1866 6.27905 13.8262 7.68788 14.8464L6.74056 16.5588ZM11.465 7.34065C11.465 7.65642 11.1978 7.92362 10.8821 7.92362C9.49751 7.92362 8.35587 9.05312 8.35587 10.4498C8.35587 10.7656 8.08868 11.0328 7.7729 11.0328C7.45713 11.0328 7.18993 10.7656 7.18993 10.4498C7.18993 8.42157 8.85382 6.75768 10.8821 6.75768C11.1978 6.75768 11.465 7.02487 11.465 7.34065ZM15.8737 5.02092C15.8737 4.88733 15.8009 4.76588 15.6794 4.693C15.4244 4.54726 14.2827 3.84284 14.0641 3.84284C13.9184 3.84284 13.7969 3.91571 13.724 4.03716L13.0682 5.21525C12.3516 5.08165 11.6108 5.00878 10.8821 5.00878C6.4005 5.00878 2.64764 7.47424 0.242903 11.1664C0.0850161 11.4093 0 11.7129 0 12.0044C0 12.308 0.0850161 12.5995 0.242903 12.8424C1.6396 15.0285 3.61926 16.8503 5.97542 17.9191C5.85397 18.1255 5.44103 18.7814 5.44103 18.9757C5.44103 19.1215 5.5139 19.2429 5.63535 19.3158C5.8904 19.4615 7.04419 20.1659 7.2628 20.1659C7.3964 20.1659 7.53 20.0931 7.60287 19.9716L8.19798 18.8907C10.7606 14.312 13.2989 9.70895 15.8616 5.13023C15.8737 5.10594 15.8737 5.04521 15.8737 5.02092ZM16.3231 10.4498C16.3231 10.1097 16.2867 9.76968 16.2259 9.42962L12.8253 15.5265C14.9264 14.7249 16.3231 12.7088 16.3231 10.4498ZM21.7641 12.0044C21.7641 11.6886 21.6791 11.4336 21.5212 11.1664C20.5739 9.59965 19.0558 8.0815 17.5498 7.07345L16.7846 8.43371C18.157 9.38104 19.3108 10.6077 20.2095 12.0044C18.3149 14.9435 15.315 17.0932 11.7808 17.3968L10.8821 19C14.5378 19 17.8169 17.3361 20.1974 14.6035C20.6711 14.0569 21.1447 13.4618 21.5212 12.8424C21.6791 12.5752 21.7641 12.3202 21.7641 12.0044Z" transform="translate(0.168945 -3.4577)" fill="#D3D8DB"/></svg></span>
      </div>

      <div class="input">
          <button type="submit" class="btn waves-effect waves-light primary white-text z-depth-0" :disabled="submitting">Get Started <i class="fa fa-spin fa-circle-o-notch" v-show="submitting"></i></button>
      </div>
    </form>

    <p class="mr">Already have an account? <router-link class="primary-text" :to="{ name: 'login' }">Login</router-link></p>
    <p class="mr">By clicking get started you agree to the <a href="#!" class="primary-text">terms of service</a> and <a href="#!" class="primary-text">privacy policies</a></p>
  </auth-index>
</template>

<script>
import AuthIndex from "./AuthIndex";
export default {
  name: "register",
  components: { AuthIndex },
  data() {
    return {
      submitting: false,
      showPassword: false,
      genderOptions: [
        { value: "male", text: " Male" },
        { value: "female", text: "Female" }
      ],
      tutor: {
        name: "",
        gender: "",
        address: "",
        phone: "",
        password: ""
      }
    };
  },
  computed: {
    passwordType() {
      return this.showPassword ? "text" : "password";
    }
  },
  methods: {
    validateAndSubmit() {
      this.$validator.validateAll().then(valid => {
        if (valid) this.submit();
      });
    },
    submit() {
      this.submitting = true;
      this.$auth.register({
        params: this.tutor,
        autologin: true,
        success: res => {
          this.submitting = false;
        },
        error: err => {
          if (err.response) {
            if (err.response.status == 422) {
              Object.keys(err.response.data.errors).forEach(item => {
                err.response.data.errors[item].forEach(message => {
                  this.errors.add(item, message);
                });
              });
            }
          }
          this.submitting = false;
        },
        redirect: { name: 'basic-setup' }
      });
    },
    login() {
      this.$router.push({ name: "login" });
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