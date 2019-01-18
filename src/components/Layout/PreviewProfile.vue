<template>
  <div>
    <vue-frame text="Load the Profile" :url="url" frame="myframe" :default="true" type="button" class="form-control dsf"></vue-frame>
    <iframe id="myframe" frameborder="0"></iframe>
  </div>
</template>

<script>
import VueFrame from 'vue-frame';

export default {
  name: 'preview-profile',
  components: { VueFrame },
  props: ['tutor'],
  data() {
    return {
      baseUrl: `${PUBLIC_URL}/t/preview/${this.tutor}?redirect=${this.$route.query.redirect || window.location.hostname}`,
    };
  },
  computed: {
    url() {
      let url = this.baseUrl;
      if (this.$route.query.subject) {
        url = `${url}&subject=${this.$route.query.subject}`;
      }
      return url;
    },
  },
};
</script>

<style>
  iframe {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
  }
</style>