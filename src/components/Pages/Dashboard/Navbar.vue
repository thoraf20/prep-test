<template>
  <div class="nav-contain">
    <nav>
      <a href="#" class="hide-on-med-and-up" @click.prevent="$store.commit('TOGGLE_VISIBILITY')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          style="enable-background:new 0 0 512 512;"
          xml:space="preserve"
          width="25px"
          height="25px"
          class
        >
          <g>
            <g>
              <g>
                <path
                  d="M491.318,235.318H20.682C9.26,235.318,0,244.577,0,256s9.26,20.682,20.682,20.682h470.636    c11.423,0,20.682-9.259,20.682-20.682C512,244.578,502.741,235.318,491.318,235.318z"
                  data-original="#000000"
                  class="active-path"
                  data-old_color="#000000"
                  fill="#818181"
                ></path>
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M491.318,78.439H20.682C9.26,78.439,0,87.699,0,99.121c0,11.422,9.26,20.682,20.682,20.682h470.636    c11.423,0,20.682-9.26,20.682-20.682C512,87.699,502.741,78.439,491.318,78.439z"
                  data-original="#000000"
                  class="active-path"
                  data-old_color="#000000"
                  fill="#818181"
                ></path>
              </g>
            </g>
            <g>
              <g>
                <path
                  d="M491.318,392.197H20.682C9.26,392.197,0,401.456,0,412.879s9.26,20.682,20.682,20.682h470.636    c11.423,0,20.682-9.259,20.682-20.682S502.741,392.197,491.318,392.197z"
                  data-original="#000000"
                  class="active-path"
                  data-old_color="#000000"
                  fill="#818181"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </a>
      <div class="offset-8 col-4 nav-actions">
        <a class="mobile-pkg">
          <small style="padding-right:10px">Selected Package:</small>
          <small class="p-1" style="border:1px solid green">{{ clientPackage }}</small>
        </a>
        <a>
          <small style="padding-right:10px">Wallet Amount:</small>
          <span
            class="tag"
            v-if="this.$auth.user().payment_type == 'post paid'"
          >₦{{ this.$auth.user().wallet && this.$auth.user().wallet.amount | numberFormat}}</span>
          <span
            class="tag"
            v-if="this.$auth.user().payment_type == 'pre paid'"
          >₦{{this.$auth.user().wallet && this.$auth.user().wallet.client_amount | numberFormat}}</span>
        </a>
        <!-- <a>
          <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="-49 0 482 482.34787" width="25px" class=""><g><path d="m374.113281 348.804688c-42.183593-24.484376-73.011719-64.617188-85.785156-111.6875l-20.800781-77.769532c-15.359375-57.714844-66.664063-98.585937-126.351563-100.65625l-7.785156-29.046875c-5.71875-21.339843-27.652344-34-48.992187-28.28125-21.332032 5.71875-33.992188 27.648438-28.277344 48.984375l7.773437 29.03125c-50.554687 31.71875-74.523437 92.691406-59.101562 150.34375l20.800781 77.769532c4.171875 15.550781 6.285156 31.585937 6.285156 47.6875-.007812 32.253906-8.476562 63.9375-24.558594 91.894531-4.550781 7.636719-3.941406 17.289062 1.535157 24.289062 4.125 5.425781 10.546875 8.613281 17.359375 8.617188 1.921875-.003907 3.835937-.253907 5.6875-.753907l115.019531-30.808593c8.832031 20.53125 29.007813 33.859375 51.359375 33.929687 16.003906.023438 31.25-6.808594 41.878906-18.773437 10.628906-11.960938 15.625-27.90625 13.71875-43.792969l115.023438-30.808594c9.625-2.585937 16.277344-11.351562 16.179687-21.3125.019531-7.804687-4.175781-15.015625-10.96875-18.855468zm-300.144531-320.808594c4.289062-7.429688 12.21875-12.003906 20.800781-12 10.875-.03125 20.402344 7.273437 23.199219 17.785156l6.757812 25.253906c-.757812.066406-1.503906.214844-2.261718.296875-2.519532.253907-5.019532.578125-7.503906.96875-1.320313.207031-2.640626.421875-3.953126.671875-2.769531.53125-5.507812 1.136719-8.214843 1.808594-.601563.152344-1.207031.238281-1.800781.398438-.59375.160156-.96875.320312-1.457032.457031-3.054687.839843-6.066406 1.789062-9.03125 2.839843-.800781.277344-1.550781.566407-2.328125.855469-3.085937 1.152344-6.125 2.410157-9.113281 3.777344-.230469.101563-.476562.183594-.710938.292969l-6.75-25.199219c-1.679687-6.140625-.828124-12.699219 2.367188-18.207031zm164.261719 396c1.113281 18.953125-11.253907 36.078125-29.597657 40.984375-18.34375 4.898437-37.605468-3.753907-46.128906-20.71875zm126.457031-50.457032-336.960938 90.242188c-2.304687.648438-4.773437-.199219-6.199218-2.128906-1.5-1.882813-1.660156-4.503906-.398438-6.550782 17.507813-30.394531 26.730469-64.847656 26.75-99.921874.003906-17.503907-2.292968-34.929688-6.839844-51.832032l-20.800781-77.761718c-14.152343-52.804688 9.144531-108.507813 56.683594-135.511719l.140625-.0625c6.71875-3.6875 13.777344-6.71875 21.074219-9.054688 2.304687-.761719 4.535156-1.671875 6.894531-2.289062 8.082031-2.140625 16.363281-3.441407 24.714844-3.886719 1.765625-.097656 3.535156-.203125 5.300781-.21875h1.234375c54.277344.011719 101.769531 36.507812 115.757812 88.953125l20.800782 77.777344c13.902344 51.160156 47.421875 94.773437 93.28125 121.375 1.839844.984375 2.980468 2.90625 2.960937 4.992187.089844 2.742188-1.734375 5.183594-4.394531 5.871094zm0 0" data-original="#000000" class="active-path" data-old_color="##81818" fill="#818181"/></g></svg>
        </a>-->
        <a>
          <img
            :src="this.$auth.user().profile_pic || '/static/img/no_image.png'"
            alt
            style="width:40px; height:40px"
          >
          <ul class="dpm">
            <li>
              <a href="/dashboard/update-profile">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  style="enable-background:new 0 0 512 512;"
                  xml:space="preserve"
                  width="16px"
                  height="16px"
                  class
                >
                  <g>
                    <g>
                      <g>
                        <path
                          d="M328.844,368.733c-5.383-3.235-10.908-6.487-16.433-9.675c1.299-11.07,1.302-22.268,0.006-33.316    c5.546-3.2,11.068-6.45,16.425-9.671c9.02-5.42,12.78-16.856,8.744-26.603c0,0,0,0-0.001-0.001l-11.771-28.418    c-4.037-9.744-14.777-15.175-24.993-12.63c-6.071,1.511-12.274,3.118-18.455,4.776c-6.901-8.732-14.82-16.649-23.563-23.554    c1.658-6.182,3.266-12.388,4.778-18.461c2.545-10.211-2.885-20.955-12.629-24.992l-28.418-11.771    c-9.744-4.038-21.183-0.281-26.605,8.741c-3.229,5.374-6.482,10.899-9.674,16.433c-11.067-1.299-22.263-1.302-33.316-0.007    c-3.202-5.551-6.453-11.074-9.67-16.426c-5.424-9.02-16.86-12.778-26.605-8.741l-28.418,11.771    c-9.742,4.036-15.174,14.781-12.629,24.992c1.515,6.085,3.121,12.289,4.776,18.455c-8.731,6.899-16.649,14.82-23.553,23.563    c-6.196-1.663-12.402-3.269-18.463-4.779c-10.214-2.547-20.956,2.888-24.993,12.631L1.615,289.467    c-4.035,9.745-0.276,21.182,8.742,26.602c5.375,3.23,10.9,6.482,16.433,9.675c-1.298,11.066-1.301,22.262-0.006,33.316    c-5.538,3.195-11.06,6.446-16.429,9.672c-9.018,5.421-12.777,16.857-8.741,26.603l11.772,28.418    c4.036,9.743,14.775,15.176,24.993,12.63c6.064-1.51,12.268-3.116,18.453-4.776c6.901,8.731,14.82,16.647,23.563,23.553    c-1.66,6.189-3.267,12.395-4.778,18.461c-2.545,10.211,2.885,20.956,12.629,24.992l28.419,11.772    c2.64,1.093,5.403,1.615,8.137,1.615c7.362,0,14.514-3.779,18.471-10.355c3.205-5.333,6.456-10.856,9.674-16.432    c11.065,1.297,22.264,1.299,33.316,0.006c3.179,5.512,6.43,11.034,9.67,16.427c5.422,9.02,16.858,12.777,26.605,8.741    l28.418-11.771c9.742-4.036,15.174-14.781,12.629-24.992c-1.503-6.033-3.109-12.237-4.776-18.455    c8.729-6.899,16.648-14.819,23.554-23.562c6.178,1.657,12.384,3.263,18.46,4.777c10.211,2.547,20.956-2.884,24.993-12.63    l11.771-28.419C341.621,385.59,337.862,374.153,328.844,368.733z M305.116,413.834c-5.837-1.462-11.787-3.008-17.703-4.602    c-8.376-2.253-17.215,0.692-22.519,7.507c-6.096,7.83-13.151,14.886-20.968,20.973c-6.807,5.302-9.748,14.138-7.493,22.509    c1.603,5.954,3.148,11.9,4.601,17.696l-26.122,10.819c-3.107-5.184-6.218-10.481-9.259-15.765    c-4.327-7.514-12.655-11.678-21.216-10.618c-9.831,1.221-19.81,1.22-29.654-0.005c-8.585-1.066-16.906,3.098-21.232,10.614    c-3.078,5.344-6.19,10.644-9.263,15.773l-26.122-10.82c1.461-5.827,3.007-11.776,4.603-17.701    c2.255-8.375-0.692-17.215-7.507-22.52c-7.83-6.095-14.885-13.149-20.973-20.965c-5.3-6.809-14.136-9.749-22.51-7.495    c-5.923,1.595-11.87,3.141-17.695,4.601l-10.82-26.121c5.16-3.094,10.459-6.205,15.765-9.26    c7.515-4.327,11.683-12.653,10.619-21.215c-1.223-9.832-1.22-19.81,0.003-29.655c1.068-8.57-3.097-16.905-10.616-21.233    c-5.304-3.054-10.604-6.166-15.772-9.265l10.82-26.121c5.82,1.459,11.768,3.005,17.702,4.602    c8.372,2.256,17.212-0.692,22.52-7.507c6.095-7.83,13.15-14.886,20.965-20.972c6.808-5.301,9.749-14.138,7.494-22.512    c-1.59-5.904-3.136-11.85-4.601-17.694l26.122-10.819c3.084,5.146,6.196,10.444,9.259,15.765    c4.328,7.515,12.663,11.689,21.216,10.618c9.827-1.223,19.804-1.223,29.657,0.005c8.575,1.068,16.905-3.102,21.231-10.617    c3.053-5.304,6.166-10.604,9.262-15.771l26.122,10.819c-1.462,5.833-3.008,11.782-4.603,17.703    c-2.255,8.374,0.692,17.214,7.507,22.519c7.829,6.095,14.885,13.149,20.973,20.965c5.3,6.807,14.133,9.748,22.511,7.494    c5.919-1.594,11.865-3.14,17.694-4.601l10.819,26.121c-5.153,3.089-10.451,6.2-15.765,9.26    c-7.515,4.327-11.684,12.654-10.619,21.216c1.223,9.827,1.221,19.806-0.005,29.657c-1.066,8.571,3.101,16.904,10.617,21.231    c5.296,3.049,10.596,6.161,15.772,9.263L305.116,413.834z"
                          data-original="#000000"
                          class="active-path"
                          data-old_color="#000000"
                          fill="#818181"
                        ></path>
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d="M241.762,312.511c0,0,0,0-0.001-0.001c-16.48-39.789-62.256-58.752-102.051-42.271    C99.922,286.721,80.958,332.501,97.44,372.29c7.983,19.276,22.997,34.287,42.271,42.272c9.637,3.991,19.763,5.987,29.889,5.987    s20.252-1.996,29.891-5.987C239.279,398.08,258.242,352.301,241.762,312.511z M190.72,393.388c-13.618,5.641-28.617,5.64-42.239,0    c-13.618-5.641-24.225-16.249-29.867-29.868c-11.647-28.114,1.753-60.462,29.868-72.107c6.885-2.852,14.021-4.202,21.047-4.202    c21.667,0,42.265,12.84,51.06,34.07C232.234,349.395,218.834,381.742,190.72,393.388z"
                          data-original="#000000"
                          class="active-path"
                          data-old_color="#000000"
                          fill="#818181"
                        ></path>
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d="M496.553,100.936c-3.956-0.592-8.019-1.167-12.111-1.713c-2.062-6.857-4.816-13.505-8.214-19.819    c2.504-3.275,4.972-6.556,7.357-9.779c5.295-7.161,4.529-17.317-1.78-23.623l-15.808-15.806    c-6.309-6.31-16.465-7.075-23.624-1.778c-3.234,2.393-6.514,4.86-9.779,7.355c-6.313-3.398-12.96-6.152-19.819-8.215    c-0.547-4.092-1.12-8.155-1.712-12.11C409.746,6.642,402.024,0,393.102,0h-22.356c-8.922,0-16.644,6.642-17.961,15.447    c-0.591,3.953-1.165,8.017-1.712,12.11c-6.859,2.063-13.507,4.817-19.819,8.215c-3.263-2.496-6.545-4.964-9.778-7.355    c-7.161-5.297-17.317-4.532-23.624,1.777l-15.806,15.805c-6.31,6.308-7.077,16.465-1.78,23.627    c2.383,3.222,4.851,6.504,7.354,9.778c-3.396,6.313-6.151,12.96-8.214,19.819c-4.091,0.547-8.155,1.121-12.11,1.713    c-8.807,1.318-15.449,9.039-15.449,17.962v22.355c0,8.922,6.64,16.644,15.447,17.962c3.956,0.592,8.019,1.167,12.111,1.713    c2.063,6.858,4.817,13.505,8.214,19.819c-2.501,3.272-4.969,6.552-7.357,9.779c-5.294,7.159-4.529,17.317,1.78,23.622    l15.808,15.808c6.308,6.31,16.464,7.074,23.624,1.778c3.234-2.391,6.514-4.86,9.778-7.354c6.315,3.398,12.963,6.152,19.82,8.214    c0.545,4.091,1.12,8.155,1.712,12.111c1.318,8.806,9.04,15.448,17.962,15.448h22.356c8.922,0,16.644-6.64,17.961-15.449    c0.591-3.956,1.165-8.019,1.712-12.111c6.858-2.061,13.505-4.817,19.819-8.215c3.263,2.496,6.545,4.964,9.778,7.356    c7.159,5.297,17.317,4.532,23.624-1.777l15.808-15.806c6.309-6.308,7.075-16.465,1.778-23.626    c-2.386-3.226-4.854-6.508-7.354-9.777c3.396-6.313,6.151-12.959,8.214-19.819c4.091-0.547,8.155-1.121,12.11-1.713    c8.807-1.318,15.449-9.039,15.449-17.962v-22.355C512,109.976,505.359,102.254,496.553,100.936z M490.228,138.142    c-3.592,0.521-7.257,1.027-10.934,1.506c-7.273,0.949-13.227,6.111-15.165,13.149c-1.857,6.739-4.552,13.242-8.009,19.328    c-3.611,6.353-3.054,14.215,1.419,20.032c2.255,2.932,4.492,5.883,6.669,8.799l-11.404,11.405    c-2.925-2.183-5.876-4.419-8.802-6.669c-5.814-4.475-13.678-5.028-20.032-1.421c-6.087,3.458-12.59,6.153-19.325,8.01    c-7.042,1.94-12.204,7.894-13.15,15.165c-0.479,3.677-0.984,7.343-1.506,10.935h-16.13c-0.521-3.592-1.026-7.257-1.506-10.931    c-0.949-7.274-6.11-13.228-13.15-15.168c-6.737-1.856-13.238-4.551-19.327-8.009c-6.354-3.61-14.218-3.055-20.031,1.419    c-2.927,2.251-5.876,4.486-8.803,6.669l-11.404-11.405c2.177-2.919,4.413-5.868,6.671-8.803c4.47-5.815,5.027-13.677,1.417-20.03    c-3.457-6.086-6.152-12.59-8.009-19.327c-1.939-7.04-7.892-12.201-15.165-13.15c-3.677-0.48-7.343-0.984-10.935-1.507v-16.128    c3.592-0.521,7.257-1.027,10.934-1.506c7.273-0.949,13.227-6.111,15.165-13.149c1.857-6.738,4.551-13.241,8.009-19.328    c3.611-6.353,3.054-14.216-1.417-20.031c-2.259-2.936-4.495-5.886-6.67-8.8l11.404-11.405c2.925,2.183,5.875,4.419,8.8,6.668    c5.812,4.475,13.675,5.033,20.034,1.422c6.085-3.457,12.589-6.152,19.325-8.01c7.042-1.94,12.204-7.894,13.15-15.165    c0.48-3.677,0.986-7.342,1.507-10.934h16.13c0.521,3.591,1.026,7.256,1.505,10.931c0.949,7.274,6.111,13.228,13.15,15.167    c6.738,1.857,13.242,4.553,19.328,8.01c6.355,3.611,14.218,3.05,20.03-1.42c2.927-2.25,5.876-4.486,8.803-6.669l11.404,11.405    c-2.175,2.915-4.411,5.866-6.67,8.803c-4.471,5.814-5.027,13.676-1.419,20.029c3.457,6.088,6.152,12.592,8.009,19.328    c1.939,7.04,7.892,12.201,15.165,13.15c3.677,0.48,7.343,0.985,10.935,1.507V138.142z"
                          data-original="#000000"
                          class="active-path"
                          data-old_color="#000000"
                          fill="#818181"
                        ></path>
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d="M381.924,83.675c-25.585,0-46.401,20.815-46.401,46.401c0,25.587,20.815,46.402,46.401,46.402    s46.401-20.815,46.401-46.402C428.325,104.49,407.51,83.675,381.924,83.675z M381.924,155.851    c-14.211,0-25.775-11.563-25.775-25.776c0-14.213,11.563-25.775,25.775-25.775c14.212,0,25.774,11.563,25.775,25.775    C407.699,144.288,396.136,155.851,381.924,155.851z"
                          data-original="#000000"
                          class="active-path"
                          data-old_color="#000000"
                          fill="#818181"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
                Settings
              </a>
              <hr>
              <a @click.prevent="logout">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  version="1.1"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 512 512"
                  style="enable-background:new 0 0 512 512;"
                  xml:space="preserve"
                  width="16px"
                  height="16px"
                  class
                >
                  <g>
                    <g>
                      <g>
                        <path
                          d="M505.664,243.739l-54.783-38.622c-9.926-6.997-23.645,0.128-23.645,12.26v23.622H164.196    c-8.284,0-15.001,6.716-15.001,15.001S155.912,271,164.196,271h263.038v23.621c0,12.212,13.792,19.204,23.644,12.26l54.783-38.622    C514.027,262.365,514.196,249.767,505.664,243.739z"
                          data-original="#000000"
                          class="active-path"
                          data-old_color="#000000"
                          fill="#818181"
                        ></path>
                      </g>
                    </g>
                    <g>
                      <g>
                        <path
                          d="M430.471,352.317c-7.169-4.146-16.347-1.698-20.496,5.474c-35.236,60.916-101.103,101.811-176.372,101.811    c-112.266,0-203.602-91.336-203.602-203.602S121.337,52.398,233.603,52.398c75.319,0,141.156,40.933,176.371,101.809    c4.148,7.172,13.328,9.619,20.496,5.474c7.171-4.148,9.621-13.325,5.474-20.496C395.418,69.127,319.729,22.397,233.603,22.397    C104.49,22.397,0,126.876,0,256c0,129.113,104.479,233.603,233.603,233.603c86.163,0,161.833-46.763,202.342-116.79    C440.092,365.642,437.642,356.466,430.471,352.317z"
                          data-original="#000000"
                          class="active-path"
                          data-old_color="#000000"
                          fill="#818181"
                        ></path>
                      </g>
                    </g>
                  </g>
                </svg>
                Log out
              </a>
            </li>
          </ul>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navbar",
  computed: {
    clientPackage() {
      var package_ =
        this.$auth.user() &&
        this.$auth.user().client_tutor_choice &&
        JSON.parse(this.$auth.user().client_tutor_choice).selected_package;
      return package_ == 1
        ? "Premium"
        : package_ == 2
        ? "Lite"
        : package_ == 3
        ? "Starter"
        : "Not Available";
    }
  },
  methods: {
    logout() {
      this.$auth.logout({
        makeRequest: false,
        success: () => {
          this.$router.push({ name: "login" });
        },
        error() {
          console.log("error logging out ");
        }
      });
    }
  },
  filters: {
    numberFormat(value) {
      return new Intl.NumberFormat().format(value);
    }
  }
};
</script>

<style scoped lang="scss">
.nav-contain {
  position: relative;
  padding: 15px 30px;
  background-color: #fff;
  border-bottom: solid 1px rgba(0, 0, 0, 0.05);
  height: 70px;
  clear: both;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.1);
  nav {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .nav-actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    a {
      position: relative;
      cursor: pointer;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 25px;
      border-left: 1px solid #efefef;
      &:hover > .dpm {
        display: block;
      }
      img {
        width: 34px;
        height: 34px;
        border-radius: 100%;
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .mobile-pkg {
      float: right !important;
      position: absolute !important;
      z-index: 9999 !important;
      top: 50px !important;
      margin-bottom: 40px !important;
      border-left: 0px !important;
      margin-top: 3px !important;
    }
  }
  .dpm {
    position: absolute;
    top: calc(100% + 7px);
    left: -50%;
    z-index: 1000;
    float: left;
    display: none;
    min-width: 165px;
    padding: 5px 0;
    margin: 2px 0 0;
    list-style: none;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 6px 12px rgba(150, 150, 150, 0.175);
    background-clip: padding-box;
    transition: all 0.3s ease-in-out;
    &:after {
      content: "";
      position: absolute;
      display: block;
      width: 37px;
      height: 12px;
      top: -12px;
      left: 0;
      right: 0;
      margin: 0 auto;
      background-image: url(../../../assets/dropdown_arrow.png);
      background-size: 100% 100%;
    }
    li > a {
      padding: 5px 15px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      clear: both;
      font-weight: 400;
      line-height: 1.42857143;
      color: #818181;
      text-decoration: none;
      white-space: nowrap;
      margin: 5px 0;
    }
    li > a:hover {
      background-image: none;
      filter: none;
      background-color: rgba(2, 17, 27, 0.05);
      color: #818181;
    }
    li > a > svg {
      margin-right: 7px;
    }
    li > hr {
      margin: 10px 0;
    }
  }
}
</style>