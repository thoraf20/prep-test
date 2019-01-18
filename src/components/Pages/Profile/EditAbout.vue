<template>
	<div class="hold">
		<h3 class="title">
			Short Bio
			<svg v-if="u.progress.about" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 352.62 352.62" style="enable-background:new 0 0 352.62 352.62;" xml:space="preserve"><g><g><path d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664   c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648   c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704   c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145   C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611   c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z" data-original="#000000" class="active-path" data-old_color="#000000" fill="#639440"/></g></g></svg>
		</h3>
			<form id="profileForm" @submit.prevent="submit" v-if="doneLoading">
				<div class="panel-body elevated">
					<br>
					<div class="row mb-3">
						<div class="col" id="aboutme-container">
							<div class="alert alert-success mb-3">
								<p>Your tutor profile is your best opportunity to "sell yourself" as a Prepclass Tutor. Our clients often look at multiple tutor profiles before selecting a tutor to contact, so you need to be thorough, yet concise in describing your tutoring abilities, qualifications, experience and teaching style.</p>

								<p class="mb-1">Use this example as a guideline.
									<strong>(Do not copy this example. It is only meant to guide your thought process)</strong>
								</p>
								<blockquote style="background-color: rgba(255,255,255,0.5);" class="p-3 font-italic">
									<p>My name is Ayomide Nonso Abdullahi, I am a graduate of Physics Education from the University of Lagos. </p>
									<p>I have 5 years of productive experience working as a private tutor in the areas of Maths, Physics and further maths. I live in Lagos where I have been able to successfully tutor over 60 students to pass various school exams, national exams and international exams.</p>
									<p>My rare skills of imparting knowledge remains my major strength as my students remain highly motivated and successful even after my reign as their tutor</p>
								</blockquote>
							</div>
							<editor name="about_tutor" v-model="tutor.about_tutor" :config="editorConfig" :class="{'is-invalid':errors.has('about_tutor')}" v-validate.disable="'required'"></editor>
							<small class="form-text text-danger" v-show="errors.has('about_tutor')">Please tell us about yourself</small>
						</div>
					</div>
					<div class="row">
						<div class="col-12 text-right">
							<button @click.prevent="submit" :disabled="submitting" class="btn btn-success btn-lg submit-button">
								Save
								<i class="fa fa-circle-o-notch fa-spin" v-show="submitting"></i>
							</button>
						</div>
					</div>
				</div>
			</form>
			<div v-else class="row justify-content-center">
				<div class="col text-center">
					<spinner />
				</div>
			</div>
	</div>
</template>

<script>
import axios from 'axios';
import VSelect from "vue-select";
import Editor from "vue-ckeditor2";
import { intersectionBy } from "lodash";
import swal from "sweetalert";
import { yearsBetween } from "@/lib/times";
import Spinner from "@/components/Preloaders/Spinner";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
	components: { VSelect, Editor, Spinner },
	name: "profile-about",
	props: ['isdash'],
	data() {
		return {
			editorConfig: {
				toolbar: [
					{ name: "clipboard", items: ["Undo", "Redo"] },
					{ name: "styles", items: ["Styles", "Format"] },
					{
						name: "basicstyles",
						items: ["Bold", "Italic", "Strike", "-", "RemoveFormat"]
					},
					{
						name: "paragraph",
						items: [
							"NumberedList",
							"BulletedList",
							"-",
							"Outdent",
							"Indent",
							"-",
							"Blockquote"
						]
					},
					{ name: "tools", items: ["Maximize"] }
				]
			},
			genderOptions: [
				{ value: "male", text: " Male" },
				{ value: "female", text: "Female" }
			],
			location: {
				states: [],
				locations: []
			},
			years: yearsBetween(1965, 2010, "desc"),
			fetchingTutor: false,
			fetchedTutor: false,
			loadingLocations: false,
			submitting: false,
			selectedLocationsOfInterest: [],
			tutor: {
				about_tutor: this.$auth.user().about_tutor
			}
		};
	},
	computed: {
		...mapGetters("profile", [
			"hasFetchedStates",
			"hasFetchedLocations",
			"isFetchingLocations",
			"isFetchingStates"
		]),
		...mapState("profile", ["states"]),
		...mapGetters("profile", ["locationsByState", "locationsByStateId"]),
		progress() {
			const states = [
				this.hasFetchedStates,
				this.hasFetchedLocations,
				this.fetchedTutor
			];
			const sum = states.reduce((a, i) => (i ? 1 + a : a), 0);
			return sum / states.length * 100;
		},
		u() {
      return this.$auth.user();
    },
		doneLoading() {
			return this.progress == 100;
		}
	},
	methods: {
		...mapMutations("profile", {
			updateProgress: "UPDATE_PROFILE"
		}),
		...mapActions("profile", ["getLocations", "getStates"]),
		getDetails() {
			return this.$http
				.get(`${BASE_API}/v1/tutor/profile/details`)
				.then(({ data: { data } }) => {
					this.fetchedTutor = true;
					this.$set(this, "tutor", { ...this.tutor, ...data });
				});
		},
		addProfile() {
			this.submitting = true;
			this.$http
				.post(BASE_API + "/v1/tutor/profile/about", this.buildData())
				.then(({ data: { message, data: tutor } }) => {
					this.errors.clear();
					this.$auth.user(tutor);
					this.updateProgress();
					axios.post(`${BASE_API}/v1/tutor/steps`, { step: 'personal_info' })
	        .then(() => this.$store.dispatch('getUserTutor'))
	        .then(() => {
	        	if (this.isdash) {
	            swal({
	              title: "Success",
	              text: `${message}`,
	              icon: "success",
	              buttons: ["Cancel", "Done ✓"]
	            })
	          } else {
		        	swal({
								title: "Success",
								text: `${message} Click next to update your credentials`,
								icon: "success",
								buttons: ["Cancel", "Next ➜"]
							})
							.then(() => this.$router.push({ name: 'educational-info-setup' }));
						}
	        })
				})
				.catch(error => {
					if (error.response && error.response.status == 422) {
						const err = error.response.data.errors;
						Object.keys(err).forEach(e => {
							err[e].forEach(er => {
								this.errors.add(e.replace(/\./g, "_"), er);
							});
						});
						this.alertFormError();
					}
				})
				.then(() => {
					this.submitting = false;
				});
		},
		mapLocationsOfInterest() {
			const mappedLocations = intersectionBy(
				this.locationsByStateId(this.tutor.state.id),
				this.tutor.locations_of_interest,
				"id"
			);
			this.$set(this, "selectedLocationsOfInterest", mappedLocations);
		},
		submit() {
			this.$validator.validateAll().then(valid => {
				if (valid) {
					this.addProfile();
				} else {
					this.alertFormError();
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
		handleStateChange: function(count) {
			this.clearSelectedLocations();
		},
		clearSelectedLocations() {
			this.tutor.location_id = null;
			this.selectedLocationsOfInterest = [];
		},
		buildData() {
			const tutor = this.tutor;
			return {
				about_tutor: tutor.about_tutor
			};
		}
	},
	mounted() {
		if (!this.hasFetchedStates && !this.isFetchingStates) this.getStates();
		if (!this.hasFetchedLocations && !this.isFetchingLocations) {
			this.getLocations().then(this.mapLocationsOfInterest);
		}
		this.getDetails();
	}
};
</script>

<style scoped lang="scss">
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
.hold {
  margin-top: 30px;
}
.panel-body {
  padding: 10px !important;
}
.submit-button {
  width: 130px;
  height: 38px;
  line-height: 38px;
  padding: 0 10px;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
  vertical-align: middle;
  box-shadow: 0 2px 2px 0 rgba(40, 167, 69, 0.14), 0 3px 1px -2px rgba(40, 167, 69, 0.12), 0 1px 5px 0 rgba(40, 167, 69, 0.2);
  float: right;
  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
    &:active {box-shadow: none !important;}
  }
}
.title {
	svg {
		float: right;
		height: 18px;
		width: 18px;
		margin: 0 15px;
	}
}
.elevated {
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 2px 2px 0 rgba(150,150,150,0.14), 0 3px 1px -2px rgba(150,150,150,0.12), 0 1px 5px 0 rgba(150,150,150,0.2);
}
.hold {
  margin: 60px 0;
}
</style>