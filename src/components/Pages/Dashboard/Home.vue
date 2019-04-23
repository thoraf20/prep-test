<template>
  <div class="container-material hold">
    <div class="info" v-for="notification of nots.filter(n => !n.read)" :key="notification.id" :class="`info-${notification.type.toLowerCase()}`">
      {{ notification.content }}
      <span style="cursor: pointer" @click="removeNotification(notification.id)"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 212.982 212.982" style="enable-background:new 0 0 212.982 212.982;" xml:space="preserve" width="9px" height="9px"><g id="Close"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312   c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312   l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937   c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z" fill="#FFFFFF"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></span>
    </div>
    <div class="content">
      <div class="alert alert-red" v-if="this.$auth.user().progress == 0 || this.$auth.user().progress == null">
        <center> 
          You are yet to update your password - It is advised you do so. Click 
          <router-link :to="{path: 'update-password'}" style="color:#639440">Here</router-link>
          to update now.
        </center>
      </div>
      <h3>Hello {{ u.name }} - Welcome to Prepclass!</h3>
      <div class="actions">
        <div class="row mb-8">
          <div class="col-md-4 col-12">
            <div class="action--card">
              <div class="action--card--details">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve" width="64px" height="64px" class=""><g><g><g id="presentation-training-teaching-meeting-discussion_1_"><path d="M10,18c0,3.309,2.691,6,6,6s6-2.691,6-6s-2.691-6-6-6S10,14.691,10,18z M20,18c0,2.206-1.794,4-4,4s-4-1.794-4-4    s1.794-4,4-4S20,15.794,20,18z" data-original="#000000" class="active-path" data-old_color="#AA7D7D" fill="#639440"/><path d="M30.707,28.707l7-7c0.391-0.391,0.391-1.023,0-1.414l-3-3c-0.37-0.37-0.962-0.392-1.358-0.052l-6.884,5.9L19.795,26H8    c-0.289,0-0.562,0.124-0.752,0.342l-7,8c-0.234,0.267-0.309,0.638-0.196,0.975l3,9c0.092,0.274,0.298,0.496,0.566,0.607    c0.268,0.109,0.569,0.1,0.83-0.029l4-2C8.79,42.724,9,42.381,9,42.019V59c0,2.757,2.243,5,5,5h8c0.552,0,1-0.447,1-1V32.618    l7.447-3.724C30.544,28.847,30.631,28.783,30.707,28.707z M9,41.98c0-0.118-0.025-0.236-0.071-0.352L7.145,37.17L9,34.851V41.98z     M21.553,31.105C21.214,31.275,21,31.621,21,32v30h-4V46c0-0.553-0.448-1-1-1s-1,0.447-1,1v16h-1c-1.654,0-3-1.346-3-3V32    c0-0.425-0.268-0.803-0.669-0.943c-0.4-0.141-0.847-0.013-1.112,0.318l-4,5c-0.225,0.281-0.281,0.662-0.148,0.996l1.659,4.146    L4.584,42.59L2.13,35.228L8.454,28H20c0.135,0,0.27-0.027,0.394-0.081l7-3c0.093-0.04,0.18-0.094,0.257-0.16l6.297-5.396    L35.586,21l-6.178,6.178L21.553,31.105z" data-original="#000000" class="active-path" data-old_color="#AA7D7D" fill="#639440"/><polygon points="14,32 15,32 15,40 17,40 17,32 18,32 18,30 14,30   " data-original="#000000" class="active-path" data-old_color="#AA7D7D" fill="#639440"/><path d="M64,50c0-3.309-2.691-6-6-6c-2.086,0-3.924,1.071-5,2.69C51.924,45.07,50.086,44,48,44s-3.924,1.071-5,2.69    C41.924,45.07,40.086,44,38,44c-3.309,0-6,2.691-6,6c0,2.086,1.071,3.924,2.69,5C33.07,56.076,32,57.914,32,60v4h2v-4    c0-2.206,1.794-4,4-4s4,1.794,4,4v4h2v-4c0-2.206,1.794-4,4-4s4,1.794,4,4v4h2v-4c0-2.206,1.794-4,4-4s4,1.794,4,4v4h2v-4    c0-2.086-1.071-3.924-2.69-5C62.929,53.924,64,52.086,64,50z M48,46c2.206,0,4,1.794,4,4s-1.794,4-4,4s-4-1.794-4-4    S45.795,46,48,46z M34,50c0-2.206,1.794-4,4-4s4,1.794,4,4s-1.794,4-4,4S34,52.206,34,50z M43,56.69    c-0.445-0.67-1.02-1.245-1.69-1.69c0.67-0.445,1.245-1.02,1.69-1.69c0.445,0.67,1.02,1.245,1.69,1.69    C44.02,55.445,43.445,56.02,43,56.69z M53,56.69c-0.445-0.67-1.02-1.245-1.69-1.69c0.67-0.445,1.245-1.02,1.69-1.69    c0.445,0.67,1.02,1.245,1.69,1.69C54.02,55.445,53.445,56.02,53,56.69z M58,54c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4    S60.206,54,58,54z" data-original="#000000" class="active-path" data-old_color="#AA7D7D" fill="#639440"/><path d="M63,0H26c-0.552,0-1,0.447-1,1v19h2V2h35v27c0,1.654-1.346,3-3,3H28v2h31c2.757,0,5-2.243,5-5V1C64,0.447,63.552,0,63,0z" data-original="#000000" class="active-path" data-old_color="#AA7D7D" fill="#639440"/><path d="M42,5H32c-0.552,0-1,0.447-1,1v4c0,0.553,0.448,1,1,1h10c0.552,0,1-0.447,1-1V9h3v1c0,0.553,0.448,1,1,1h4v3h-4    c-0.552,0-1,0.447-1,1v4c0,0.553,0.448,1,1,1h4v3h-4c-0.552,0-1,0.447-1,1v4c0,0.553,0.448,1,1,1h10c0.552,0,1-0.447,1-1v-4    c0-0.553-0.448-1-1-1h-4v-3h4c0.552,0,1-0.447,1-1v-4c0-0.553-0.448-1-1-1h-4v-3h4c0.552,0,1-0.447,1-1V6c0-0.553-0.448-1-1-1H47    c-0.552,0-1,0.447-1,1v1h-3V6C43,5.447,42.552,5,42,5z M41,9h-8V7h8V9z M56,27h-8v-2h8V27z M56,18h-8v-2h8V18z M48,7h8v2h-8V7z" data-original="#000000" class="active-path" data-old_color="#AA7D7D" fill="#639440"/><rect x="32" y="13" width="11" height="2" data-original="#000000" class="active-path" data-old_color="#AA7D7D" fill="#639440"/><rect x="39" y="17" width="4" height="2" data-original="#000000" class="active-path" data-old_color="#AA7D7D" fill="#639440"/><rect x="40" y="21" width="3" height="2" data-original="#000000" class="active-path" data-old_color="#AA7D7D" fill="#639440"/><rect x="37" y="25" width="6" height="2" data-original="#000000" class="active-path" data-old_color="#AA7D7D" fill="#639440"/><path d="M4,10h0.5l2.7,3.6C7.393,13.856,7.691,14,8,14c0.105,0,0.212-0.017,0.316-0.052C8.725,13.812,9,13.431,9,13v-3h6    c1.654,0,3-1.346,3-3V3c0-1.654-1.346-3-3-3H4C2.346,0,1,1.346,1,3v4C1,8.654,2.346,10,4,10z M3,3c0-0.552,0.449-1,1-1h11    c0.551,0,1,0.448,1,1v4c0,0.552-0.449,1-1,1H8C7.448,8,7,8.447,7,9v1L5.8,8.4C5.611,8.148,5.315,8,5,8H4C3.449,8,3,7.552,3,7V3z" data-original="#000000" class="active-path" data-old_color="#AA7D7D" fill="#639440"/><rect x="5" y="4" width="9" height="2" data-original="#000000" class="active-path" data-old_color="#AA7D7D" fill="#639440"/></g><g id="Layer_1_21_"></g></g></g> </svg>
                <h5>Classes</h5>
                <p v-if="!classes.length">You have no active class.</p>
                <!--<p v-else>-->
                  <!--You have -->
                          <!--{{ ac.filter((s) => { return s.level  == 1}).length}}-->
                          <!--{{ ac.filter((s) => { return s.level  == 1}).length > 1 ? 'classes' : 'class'}} under Fulfilment,-->
                          <!--{{ ac.filter((s) => { return s.level  == 2}).length}} {{ ac.filter((s) => { return s.level  == 2}).length > 1 ? 'classes' : 'class'}} under Connection and-->
                          <!--{{ ac.filter((s) => { return s.level  == 3}).length}} {{ ac.filter((s) => { return s.level  == 3}).length > 1 ? 'classes' : 'class'}} under CRM.-->
                <!--</p>-->
                <p v-else>Click start to view your class</p>
              </div>
              <div class="action--card--action">
                <router-link tag="button" :to="{ name: 'classes-dashboard' }" class="btn ">Start</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-12">
            <div class="action--card">
              <div class="action--card--details">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="64px" height="64px" class=""><g><g><g><path d="M414.007,148.75c5.522,0,10-4.477,10-10V30c0-16.542-13.458-30-30-30h-364c-16.542,0-30,13.458-30,30v452    c0,16.542,13.458,30,30,30h364c16.542,0,30-13.458,30-30v-73.672c0-5.523-4.478-10-10-10c-5.522,0-10,4.477-10,10V482    c0,5.514-4.486,10-10,10h-364c-5.514,0-10-4.486-10-10V30c0-5.514,4.486-10,10-10h364c5.514,0,10,4.486,10,10v108.75    C404.007,144.273,408.485,148.75,414.007,148.75z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g><g><g><path d="M212.007,54c-50.729,0-92,41.271-92,92c0,26.317,11.11,50.085,28.882,66.869c0.333,0.356,0.687,0.693,1.074,1    c16.371,14.979,38.158,24.13,62.043,24.13c23.885,0,45.672-9.152,62.043-24.13c0.387-0.307,0.741-0.645,1.074-1    c17.774-16.784,28.884-40.552,28.884-66.869C304.007,95.271,262.736,54,212.007,54z M212.007,218    c-16.329,0-31.399-5.472-43.491-14.668c8.789-15.585,25.19-25.332,43.491-25.332c18.301,0,34.702,9.747,43.491,25.332    C243.405,212.528,228.336,218,212.007,218z M196.007,142v-6.5c0-8.822,7.178-16,16-16s16,7.178,16,16v6.5c0,8.822-7.178,16-16,16    S196.007,150.822,196.007,142z M269.947,188.683c-7.375-10.938-17.596-19.445-29.463-24.697c4.71-6.087,7.523-13.712,7.523-21.986    v-6.5c0-19.851-16.149-36-36-36s-36,16.149-36,36v6.5c0,8.274,2.813,15.899,7.523,21.986    c-11.867,5.252-22.088,13.759-29.463,24.697c-8.829-11.953-14.06-26.716-14.06-42.683c0-39.701,32.299-72,72-72s72,32.299,72,72    C284.007,161.967,278.776,176.73,269.947,188.683z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g><g><g><path d="M266.007,438h-54c-5.522,0-10,4.477-10,10s4.478,10,10,10h54c5.522,0,10-4.477,10-10S271.529,438,266.007,438z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g><g><g><path d="M266.007,382h-142c-5.522,0-10,4.477-10,10s4.478,10,10,10h142c5.522,0,10-4.477,10-10S271.529,382,266.007,382z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g><g><g><path d="M266.007,326h-142c-5.522,0-10,4.477-10,10s4.478,10,10,10h142c5.522,0,10-4.477,10-10S271.529,326,266.007,326z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g><g><g><path d="M88.366,272.93c-1.859-1.86-4.439-2.93-7.079-2.93c-2.631,0-5.211,1.07-7.07,2.93c-1.86,1.86-2.93,4.44-2.93,7.07    s1.069,5.21,2.93,7.07c1.87,1.86,4.439,2.93,7.07,2.93c2.64,0,5.21-1.07,7.079-2.93c1.86-1.86,2.931-4.44,2.931-7.07    S90.227,274.79,88.366,272.93z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g><g><g><path d="M88.366,328.93c-1.869-1.86-4.439-2.93-7.079-2.93c-2.631,0-5.2,1.07-7.07,2.93c-1.86,1.86-2.93,4.44-2.93,7.07    s1.069,5.21,2.93,7.07c1.87,1.86,4.439,2.93,7.07,2.93c2.64,0,5.21-1.07,7.079-2.93c1.86-1.86,2.931-4.44,2.931-7.07    S90.227,330.79,88.366,328.93z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g><g><g><path d="M88.366,384.93c-1.869-1.86-4.439-2.93-7.079-2.93c-2.631,0-5.2,1.07-7.07,2.93c-1.86,1.86-2.93,4.44-2.93,7.07    s1.069,5.21,2.93,7.07c1.859,1.86,4.439,2.93,7.07,2.93c2.64,0,5.22-1.07,7.079-2.93c1.86-1.86,2.931-4.44,2.931-7.07    S90.227,386.79,88.366,384.93z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g><g><g><path d="M266.007,270h-142c-5.522,0-10,4.477-10,10s4.478,10,10,10h142c5.522,0,10-4.477,10-10S271.529,270,266.007,270z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g><g><g><path d="M491.002,130.32c-9.715-5.609-21.033-7.099-31.871-4.196c-10.836,2.904-19.894,9.854-25.502,19.569L307.787,363.656    c-0.689,1.195-1.125,2.52-1.278,3.891l-8.858,79.344c-0.44,3.948,1.498,7.783,4.938,9.77c1.553,0.896,3.278,1.34,4.999,1.34    c2.092,0,4.176-0.655,5.931-1.948l64.284-47.344c1.111-0.818,2.041-1.857,2.73-3.052l125.841-217.963    C517.954,167.638,511.058,141.9,491.002,130.32z M320.063,426.394l4.626-41.432l28.942,16.71L320.063,426.394z M368.213,386.996    l-38.105-22l100.985-174.91l38.105,22L368.213,386.996z M489.054,177.693l-9.857,17.073l-38.105-22l9.857-17.073    c2.938-5.089,7.682-8.729,13.358-10.25c5.678-1.522,11.606-0.74,16.694,2.198c5.089,2.938,8.729,7.682,10.25,13.358    C492.772,166.675,491.992,172.604,489.054,177.693z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g></g> </svg>
                <h5>Edit Profile</h5>
                <p>Edit your personal information.</p>
              </div>
              <div class="action--card--action">
                <router-link tag="button" :to="{name: 'update-profile' }" class="btn ">Start</router-link>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-12">
            <div class="action--card">
              <div class="action--card--details">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 468.7 468.7" style="enable-background:new 0 0 468.7 468.7;" xml:space="preserve" width="40px" height="40px" class=""><g><g><g><path d="M449.35,0h-430c-6.6,0-12,5.4-12,12s5.4,12,12,12h25.9v432.4c0,4.4,2.4,8.5,6.3,10.6s8.6,1.9,12.3-0.6l52.1-34.7    l52.3,34.8c4,2.7,9.3,2.7,13.3,0l52.1-34.7l52.3,34.8c4,2.7,9.3,2.7,13.3,0l52.1-34.7l52.3,34.8c2,1.3,4.3,2,6.6,2    c1.9,0,3.9-0.5,5.7-1.4c3.9-2.1,6.3-6.2,6.3-10.6l-0.2-432.4h27.3c6.6,0,12-5.4,12-12S455.95,0,449.35,0z M398.35,434l-40.3-26.8    c-4-2.7-9.3-2.7-13.3,0l-52.1,34.8l-52.3-34.8c-4-2.7-9.3-2.7-13.3,0l-52.1,34.7l-52.3-34.7c-4-2.7-9.3-2.7-13.3,0l-40.1,26.7    v-410h329L398.35,434z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/><path d="M124.45,191.6h125.7c6.6,0,12-5.4,12-12s-5.4-12-12-12h-125.7c-6.6,0-12,5.4-12,12S117.75,191.6,124.45,191.6z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/><path d="M124.45,233.3h94.2c6.6,0,12-5.4,12-12s-5.4-12-12-12h-94.2c-6.6,0-12,5.4-12,12S117.75,233.3,124.45,233.3z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/><path d="M312.95,191.6h31.4c6.6,0,12-5.4,12-12s-5.4-12-12-12h-31.4c-6.6,0-12,5.4-12,12S306.25,191.6,312.95,191.6z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/><path d="M312.95,233.3h31.4c6.6,0,12-5.4,12-12s-5.4-12-12-12h-31.4c-6.6,0-12,5.4-12,12S306.25,233.3,312.95,233.3z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/><path d="M124.45,95.3h125.7c6.6,0,12-5.4,12-12c0-6.6-5.4-12-12-12h-125.7c-6.6,0-12,5.4-12,12    C112.45,89.9,117.75,95.3,124.45,95.3z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/><path d="M124.45,136.9h94.2c6.6,0,12-5.4,12-12s-5.4-12-12-12h-94.2c-6.6,0-12,5.4-12,12S117.75,136.9,124.45,136.9z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/><path d="M312.95,95.3h31.4c6.6,0,12-5.4,12-12c0-6.6-5.4-12-12-12h-31.4c-6.6,0-12,5.4-12,12C300.95,89.9,306.25,95.3,312.95,95.3    z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/><path d="M312.95,136.9h31.4c6.6,0,12-5.4,12-12s-5.4-12-12-12h-31.4c-6.6,0-12,5.4-12,12S306.25,136.9,312.95,136.9z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/><path d="M124.45,289.1h125.7c6.6,0,12-5.4,12-12s-5.4-12-12-12h-125.7c-6.6,0-12,5.4-12,12S117.75,289.1,124.45,289.1z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/><path d="M124.45,330.7h94.2c6.6,0,12-5.4,12-12s-5.4-12-12-12h-94.2c-6.6,0-12,5.4-12,12S117.75,330.7,124.45,330.7z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/><path d="M312.95,289.1h31.4c6.6,0,12-5.4,12-12s-5.4-12-12-12h-31.4c-6.6,0-12,5.4-12,12S306.25,289.1,312.95,289.1z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/><path d="M312.95,330.7h31.4c6.6,0,12-5.4,12-12s-5.4-12-12-12h-31.4c-6.6,0-12,5.4-12,12S306.25,330.7,312.95,330.7z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g></g></svg>
                <h5>Tickets</h5>
                <p>You have {{ tickets.length || 'no' }} ticket{{ tickets.length > 1 ? 's 🕵🏽‍♂️' : '. Good Job! 🎉🎊'}}.</p>
              </div>
              <div class="action--card--action">
                <router-link tag="button" :to="{ name: 'tickets-dashboard' }" class="btn ">Start</router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-8">
          <div class="col-12">
            <div class="action--card">
              <div class="action--card--details">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="64px" height="64px" class=""><g><g><g><path d="M487.59,299.894h-7.662v-69.015c0-10.926-5.438-20.6-13.743-26.478v-9.397c0-13.631-11.089-24.72-24.72-24.72h-5.721    l21.889-32.12c7.337-10.766,4.547-25.495-6.219-32.833L302.883,4.111c-5.215-3.555-11.501-4.867-17.705-3.69    c-6.201,1.175-11.574,4.694-15.128,9.91L141.849,198.454h-35.675l8.607-87.13c0.097-0.982,0.735-1.833,1.625-2.168    c11.089-4.181,20.699-11.989,27.059-21.985c0.501-0.787,1.446-1.237,2.424-1.138l55.955,5.528    c4.012,0.389,7.581-2.533,7.977-6.543s-2.533-7.581-6.543-7.977l-55.955-5.528c-6.495-0.636-12.689,2.357-16.169,7.825    c-4.676,7.35-11.742,13.09-19.895,16.164c-6.137,2.314-10.351,7.826-10.999,14.387l-8.748,88.564h-9.303L95.821,60.649    c0.49-4.96,4.917-8.604,9.883-8.107l113.074,11.17c4.01,0.387,7.581-2.533,7.977-6.543s-2.533-7.581-6.543-7.977l-113.074-11.17    C94.174,36.743,82.581,46.248,81.3,59.214l-10.972,111.07H51.643c-13.63,0-24.72,11.089-24.72,24.72v6.41    c-11.151,5.134-18.915,16.406-18.915,29.465v248.695c0,17.88,14.546,32.426,32.427,32.426h407.067    c17.88,0,32.426-14.546,32.426-32.426V410.56h7.662c9.044,0,16.401-7.357,16.401-16.4v-77.865    C503.992,307.251,496.634,299.894,487.59,299.894z M441.465,184.876L441.465,184.876c5.586-0.001,10.129,4.543,10.129,10.129    v3.717c-1.342-0.17-2.705-0.267-4.092-0.267h-30.955l9.253-13.579H441.465z M282.107,18.547c1.36-1.995,3.415-3.341,5.787-3.791    c0.567-0.107,1.136-0.161,1.701-0.161c1.797,0,3.553,0.538,5.071,1.572l148.531,101.22c4.118,2.807,5.186,8.441,2.38,12.559    l-46.686,68.506h-11.204l22.889-33.587c3.712-5.447,4.018-12.379,0.796-18.092c-4.282-7.59-6.018-16.527-4.888-25.166    c0.84-6.427-1.988-12.701-7.38-16.375L322.106,52.76c-5.393-3.675-12.267-4.012-17.941-0.879    c-7.625,4.21-16.578,5.863-25.208,4.655c-6.4-0.898-12.891,1.992-16.548,7.357l-91.699,134.56h-11.204L282.107,18.547z     M285.32,142.438c-31.771,0-57.851,24.773-59.976,56.015h-36.979L274.464,72.11c0.001,0,0.001,0,0.001,0    c0.489-0.719,1.3-1.147,2.133-1.147c0.111,0,0.222,0.008,0.333,0.023c11.738,1.642,23.913-0.604,34.285-6.331    c0.816-0.452,1.864-0.387,2.672,0.163l76.999,52.473c0.806,0.55,1.249,1.502,1.129,2.426c-1.537,11.749,0.825,23.903,6.648,34.225    c0.467,0.829,0.41,1.891-0.144,2.706l-28.488,41.804h-24.733C343.172,167.211,317.093,142.438,285.32,142.438z M330.668,198.454    h-90.695c2.09-23.189,21.624-41.424,45.347-41.424C309.044,157.029,328.579,175.265,330.668,198.454z M41.514,195.004    c0-5.586,4.543-10.13,10.129-10.13h17.244l-1.341,13.579H41.514V195.004z M22.599,230.879c0-9.834,8.001-17.835,17.836-17.835    h407.067c9.835,0,17.835,8.001,17.835,17.835v20.244H22.599V230.879z M465.337,479.574c0,9.834-8,17.835-17.835,17.835H40.435    c-9.835,0-17.836-8.001-17.836-17.835V459.33h39.342c4.03,0,7.295-3.266,7.295-7.295c0-4.029-3.266-7.295-7.295-7.295H22.599    V265.714h442.738v34.18h-69.366h-0.001c-21.856,0-40.788,12.74-49.773,31.181c-0.03,0.062-0.064,0.122-0.095,0.184    c-0.076,0.157-0.142,0.32-0.216,0.478c-1.07,2.273-2,4.626-2.757,7.054c-0.002,0.007-0.004,0.013-0.006,0.02    c-1.615,5.189-2.486,10.702-2.486,16.416c0,30.511,24.822,55.333,55.332,55.333h0.001h69.366v34.18H108.655    c-4.03,0-7.295,3.266-7.295,7.295c0,4.029,3.266,7.295,7.295,7.295h356.682V479.574z M489.401,394.159    c0,0.998-0.812,1.81-1.811,1.81h-91.618c-15.445,0-28.911-8.639-35.818-21.338c-0.314-0.577-0.614-1.163-0.901-1.756    c-0.573-1.187-1.09-2.406-1.547-3.654c-1.602-4.366-2.476-9.08-2.476-13.994s0.875-9.628,2.476-13.994    c0.458-1.247,0.975-2.466,1.547-3.654c0.287-0.593,0.587-1.179,0.901-1.756c6.907-12.699,20.373-21.338,35.818-21.338h91.618    c0.998,0,1.811,0.812,1.811,1.81V394.159z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g><g><g><path d="M397.681,325.627c-16.322,0-29.6,13.279-29.6,29.6c0,16.321,13.278,29.599,29.6,29.599c16.322,0,29.6-13.278,29.6-29.599    C427.281,338.906,414.003,325.627,397.681,325.627z M397.681,370.235c-8.276,0-15.009-6.733-15.009-15.008    c0-8.275,6.733-15.009,15.009-15.009s15.009,6.733,15.009,15.009S405.957,370.235,397.681,370.235z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g></g></svg>
                <h5>Transaction History</h5>
                <p>View all transaction that has happended on your account</p>
              </div>
              <div class="action--card--action">
                <router-link tag="button" :to="{ name: 'earnings-dashboard' }" class="btn ">Start</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="refer hide">
        <button class="btn">Refer a Tutor</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import swal from 'sweetalert';

export default {
  name: 'dashboard-home',
  beforeRouteEnter(to, from, next) {
    next(vm => vm.$store.commit('OFF_VISIBILITY'));
  },
  data() {
    return {
      nots: [],
      r: [],
      API: `${BASE_API}/v1`,
    };
  },
  computed: {
    u() {
      return this.$auth.user();
    },
    earnings() {
      return this.$store.getters.tutor_earnings;
    },
    classes() {
      return this.$store.getters.session_classes;
    },
    ac() {
      return this.classes.filter(c => c.status && c.status.name.toLowerCase() === 'active');
    },
    pc() {
      return this.classes.filter(c => c.status && c.status.name.toLowerCase() === 'paused');
    },
    ec() {
      return this.classes.filter(c => c.status && c.status.name.toLowerCase() === 'ended');
    },
    tickets() {
      return this.$store.getters.tutor_tickets;
    },
  },
  methods: {
    removeNotification(id) {
      const nots = this.r.findIndex(n => n.id === id);
      this.r[nots].read = true;
      this.nots.splice(nots, 1);
      const notifications = [];

      for (const notification of this.r) {
        notifications.push(notification);
      }

      this.$store.dispatch('updateNotifications', notifications)
        .then(response => swal('Successful', response, 'success'))
        .catch(response => swal('Failed', response, 'error'));
    },
    listen() {
      Echo.channel(`tutor-${this.$auth.user().id}-notifications`)
        .listen('NewNotification', ({notification}) => {
          this.r.push(notification);
          this.nots.push(notification);
        });
    },
  },
  mounted() {
    for (const n of this.$auth.user().notifications) {
      this.r.push(n);
      this.nots.push(n);
    }

    this.listen();

    this.$store.dispatch('getEarnings');

    this.$store.dispatch('getClasses')
    .catch(error => swal('Something went wrong', error, 'error'));

    this.$store.dispatch('getTickets')
      .then(response => this.doneLoading = true)
      .catch(error => swal('Something went wrong', error, 'error'));
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.hold {padding: 25px 0;overflow:auto}
.container-material {
  display: block;
}
.info {
  width: 100%;
  margin: 13px 0;
  border-radius: 4px;
  height: 47px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 16px;
  background-color: rgba(77, 79, 92, 0.7);
  position: relative;
  &.info-error {background-color: rgba(242, 85, 106, 0.7);}
  &.info-default {background-color: rgba(77, 79, 92, 0.7);}
  span {position: absolute; right: 15px; top: 50%; transform: translateY(-50%); cursor: pointer}
}
.content {
  padding: 0;
  h3 {
    font-size: 24px;
    color: #4D4F5C;
    text-align: center;
    font-weight: 600;
    margin: 20px 0 10px 0;
  }
  p {
    width: 80%;
    text-align: center;
    color: #818181;
    font-size: 16px;
    line-height: 22px;
    font-weight: 300;
    margin: 0 auto 10px auto;
  }
  .alert {
    background: #f8d7da;
    color:#333;
  }
  .actions {
    padding: 25px 0;
    .action--card {
      width: 100%;
      width: 260px;
      height: 320px;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      border: 0.5px solid rgba(112, 112, 112, 0.1);
      border-radius: 4px;
      background-color: #ffffff;
      margin: 0 auto;
      padding: 45px 25px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      &.r {float: right}
      &.l {float: left}
      .action--card--details {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        svg {margin: 15px 0; margin-top: 0;}
        h5 {font-weight: 600; color: #4D4F5C; margin: 10px;}
        p {font-weight: 300; color: #818181; font-size: 14px; margin: 0; width: 220px; text-align: center;}
      }
      .action--card--action {
        button {
          width: 90px;
          height: 35px;
          border: 1px solid #639440;
          font-size: 14px;
          color: #639440;
          background: #ffffff;
          font-weight: 400;
        }
      }
    }
  }
  .refer {
    width: 100%;
    height: 47px;
    button {
      width: 100%;
      height: 47px;
      background-color: #639440;
      color: #ffffff;
    }
  }
}
.mb-8 {margin-bottom: 3em;}

@media only screen and (max-width: 600px) {
  .content {
    .actions {
      .action--card {
        margin: 0 auto;
        margin-bottom: 25px;
      }
    }
  }
  .mb-8 {margin-bottom: 0;}
  .submit-button:not(.ignore) {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 54px;
    float: left;
    left: 0;
    border-radius: 0;
    text-transform: uppercase;
    margin: 0;
  }
}

</style>