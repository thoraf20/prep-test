<template>
  <div id="login">
    <div class="box z-depth-15">
      <div class="tr"><img src="https://prepclass.com.ng/img/logo.png" class="img-fluid mb-2 mt-2" /></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "auth-index",
  data() {
    return {
      linkedinURL: BASE_API + "/v1/tutor/linkedin/redirect",
      facebookURL: BASE_API + "/v1/tutor/facebook/redirect",
        twitterURL: BASE_API + "/v1/tutor/twitter/redirect"
    };
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    231.71deg,
    rgb(95, 152, 99) 13.27%,
    rgba(95, 152, 99, 0.69) 60.4%,
    rgba(95, 152, 99, 0.39) 99.73%
  );

  .box {
    padding: 16px;
    border-radius: 7px;
    background-color: white;

    div.tr {
      width: 65%;
      margin-left: auto;
      margin-right: auto;
    }
    h4.tr {
      font-size: 24px;
      font-weight: 600;
      text-align: center;
      text-transform: capitalize;
      font-family: "Product Sans", sans-serif;
      letter-spacing: 2px;
      margin-bottom: 0;
    }
    p {
      max-width: 330px;
      text-align: center;

      &.tagline {
        font-weight: 500;
        font-size: 13px;
        color: #000000;
        opacity: 0.5;
        text-align: center;
        margin-top: 7px;
      }
      &.mr {
        margin: 25px 0;
        font-weight: 500;
        color: #a3a3a3;
      }
    }
    div.alert {
      width: 330px;
    }
    div.input {
      position: relative;

      input,
      select {
        margin: 25px 0 0 0;
        padding: 0 16px;
        border-radius: 5px;
        border: 1px solid #ecf0f3;
        background: #fcfcfd;
        box-sizing: border-box;
        width: 330px;
        height: 53px;
        outline-color: #35b2f9;
        font-size: 14px;
        font-family: "Product Sans", sans-serif;
        color: #454749;
      }
      .abs {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(25%);
      }

      button,
      a.social {
        margin: 25px 0 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 3px;
        box-sizing: border-box;
        width: 330px;
        height: 53px;
        font-size: 14px;
        font-family: "Product Sans", sans-serif;
        text-transform: uppercase;
        font-weight: 500;
      }
    }

    a.google {
      margin-bottom: 15px;
      padding: 0 16px;
      border-radius: 3px;
      box-sizing: border-box;
      width: 330px;
      height: 53px;
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 14px;
      font-family: "Product Sans", sans-serif;
      font-weight: 500;
      color: #a3a3a3;
      text-transform: none;
      border: 1px solid #ecf0f3;

      svg {
        margin-right: 10px;
      }
    }
  }
}
.btn,
.btn-flat {
  border: none;
  outline: none !important;
  border-radius: 3px;
  display: inline-block;
  height: 36px;
  line-height: 36px;
  padding: 0 16px;
  text-transform: uppercase;
  vertical-align: middle;
  -webkit-tap-highlight-color: transparent; // Gets rid of tap active state
}
z-depth-15 {
  box-shadow: 0 2px 2px 0 hsla(0, 0%, 59%, 0.1),
    0 3px 1px -2px hsla(0, 0%, 59%, 0.1), 0 1px 5px 0 hsla(0, 0%, 59%, 0.1);
}
.primary {
  background-color: rgb(95, 152, 99);
}
.primary-text {
  color: rgb(95, 152, 99);
}
.white {
  background-color: #ffffff;
}
.white-text {
  color: #ffffff;
}
</style>