<template>
  <div class="container-fluid h-100">
    <div class="row h-100 align-items-center justify-content-center">
      <div class="col-md-4  text-center">
        <div class="big font-weight-bold" style="font-size: 10em; color: #FF8181;">
          404
        </div>
        <div class="h4 text-muted">Page Not Found !</div>
        <p class="text-muted mb-3">The page you are looking for could not be found</p>
        <div class="text-center">
          <button @click="$router.back()" class="btn btn-rounded btn-success">Go Back</button>
        </div>
        <div class="mt-5 row justify-content-center">
          <div class="col-12 col-md-8 social" style="font-size: 1.3em;">
            <div class="d-flex justify-content-around">
              <a class="footer-link " href="https://facebook.com/prepclass.com.ng">
                <i class="fab fa-facebook-square"></i>
              </a>
              <a class="footer-link " href="https://twitter.com/PrepclassNG">
                <i class="fab fa-twitter-square"></i>
              </a>
              <a class="footer-link " href="http://gplus.to/prepclass">
                <i class="fab fa-google-plus-square"></i>
              </a>
              <a class="footer-link " href="https://www.instagram.com/prepclassng/">
                <i class="fab fa-instagram"></i>
              </a>
              <a class="footer-link " href="https://youtube.com/prepclassng">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default { name: "404" };
</script>

 <style>
.social a {
  color: #888;
  font-size: 1.5em;
}
</style>

 