<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light" >
            <div class="container">
                <a class="navbar-brand" href="" onclick="window.location.reload();return false">
                    <img class="logo" width="150" src="//prepclass.com.ng/img/logo.png">
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#topMenu" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="topMenu">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Home</a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link" href="#">Edit Profile</a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link" href="#">Credentials</a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link" href="#">Subjects</a>
                        </li>
                        <li class="nav-item ">
                            <a class="nav-link" href="#">Photo &amp; Videos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Availability</a>
                        </li>
                        <li class="nav-item }">
                            <a class="nav-link" href="">Status</a>
                        </li>
                    </ul>
                    <div class="navbar-nav">
                        <div class="nav-item dropdown">
                            <a href="#" class="dropdown-toggle">
						<span class="profile-img">
							<img id="topPic" src="" width="40" onerror="" class="img-fluid img rounded-circle">
						</span>
                                <span>
                                    {{$auth.user().name}}
                                </span>
                            </a>
                            <div class="dropdown-menu">
                                <div class="dropdown-item">
                                    <a href="#" style="display: block; width: 100%;" @click="logout">Logout</a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "nav-bar",
        methods: {
            logout(){
                this.$auth.logout({
                    makeRequest: false,
                    success(){
                        console.log('Successfully logout')
                    },
                    error(){
                        console.log('error logging out ')
                    }
                });
            }
        }
    }
</script>

<style scoped>

</style>