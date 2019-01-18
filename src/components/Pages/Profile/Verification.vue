<template>
  <div>
    <span class="side-bar-title">Verification</span>
    <div class="card">
      <div class="container">
        <div class="content-section">
          <div class="row" style="width:100%">
            <b-tabs style="width:100vw">
              <div class="col-sm-6">
                <b-tab title="Photos and Videos" active>
                  <br>
                  <photos> </photos>
                </b-tab>
              </div>
              <div class="col-sm-6">
                <b-tab title="Add Social Accounts">
                  <br>
                  <social> </social>
                </b-tab>
              </div>
              <div class="col-sm-6">
                <b-tab title="Identity Verification">
                  <br>
                  <identity> </identity>
                </b-tab>
              </div>
            </b-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Index from "./Index";
import Photos from "../Verification/Photos"
import Social from "../Verification/Social"
import Identity from "../Verification/Identity"
export default {
  components: { Index, Photos, Social, Identity },
  name: "Verification"
}

</script>
<style scoped>
</style>
